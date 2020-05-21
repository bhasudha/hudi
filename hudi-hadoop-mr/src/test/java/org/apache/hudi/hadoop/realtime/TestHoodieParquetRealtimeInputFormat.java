/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.apache.hudi.hadoop.realtime;

import static org.apache.hudi.common.testutils.HoodieTestUtils.generateFakeHoodieWriteStat;
import static org.apache.hudi.common.testutils.HoodieTestUtils.getDefaultHadoopConf;
import static org.apache.hudi.common.testutils.HoodieTestUtils.init;
import static org.apache.hudi.common.testutils.SchemaTestUtil.generateAvroRecordFromJson;
import static org.apache.hudi.common.testutils.SchemaTestUtil.getEvolvedSchema;
import static org.apache.hudi.hadoop.config.HoodieRealtimeConfig.MAX_DFS_STREAM_BUFFER_SIZE_PROP;
import static org.apache.hudi.hadoop.utils.HoodieInputFormatUtils.HOODIE_COMMIT_TIME_COL_POS;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.apache.avro.Schema;
import org.apache.avro.generic.IndexedRecord;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.hive.metastore.api.hive_metastoreConstants;
import org.apache.hadoop.hive.serde2.ColumnProjectionUtils;
import org.apache.hadoop.io.ArrayWritable;
import org.apache.hadoop.io.NullWritable;
import org.apache.hadoop.io.Writable;
import org.apache.hadoop.mapred.FileInputFormat;
import org.apache.hadoop.mapred.InputSplit;
import org.apache.hadoop.mapred.JobConf;
import org.apache.hadoop.mapred.RecordReader;
import org.apache.hudi.avro.HoodieAvroUtils;
import org.apache.hudi.common.fs.FSUtils;
import org.apache.hudi.common.model.HoodieCommitMetadata;
import org.apache.hudi.common.model.HoodieLogFile;
import org.apache.hudi.common.model.HoodieTableType;
import org.apache.hudi.common.model.HoodieWriteStat;
import org.apache.hudi.common.table.log.HoodieLogFormat;
import org.apache.hudi.common.table.log.block.HoodieAvroDataBlock;
import org.apache.hudi.common.table.log.block.HoodieLogBlock;
import org.apache.hudi.common.table.timeline.HoodieTimeline;
import org.apache.hudi.common.util.Option;
import org.apache.hudi.hadoop.testutils.InputFormatTestUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

public class TestHoodieParquetRealtimeInputFormat {

  private HoodieParquetRealtimeInputFormat inputFormat;
  private JobConf jobConf;
  private Configuration hadoopConf;
  private FileSystem fs;
  private Schema schema;

  @TempDir
  public java.nio.file.Path basePath;

  @BeforeEach
  public void setUp() throws IOException {
    inputFormat = new HoodieParquetRealtimeInputFormat();
    jobConf = new JobConf();
    jobConf.set(MAX_DFS_STREAM_BUFFER_SIZE_PROP, String.valueOf(1024 * 1024));
    hadoopConf = getDefaultHadoopConf();
    fs = FSUtils.getFs(basePath.toString(), hadoopConf);
    schema = HoodieAvroUtils.addMetadataFields(getEvolvedSchema());
    setPropsForInputFormat(inputFormat, jobConf, schema);
  }

  private static void setPropsForInputFormat(HoodieParquetRealtimeInputFormat inputFormat, JobConf jobConf,
                                             Schema schema) {
    List<Schema.Field> fields = schema.getFields();
    String names = fields.stream().map(Schema.Field::name).collect(Collectors.joining(","));
    String postions = fields.stream().map(f -> String.valueOf(f.pos())).collect(Collectors.joining(","));
    Configuration conf = getDefaultHadoopConf();

    String hiveColumnNames = fields.stream().filter(field -> !field.name().equalsIgnoreCase("datestr"))
        .map(Schema.Field::name).collect(Collectors.joining(","));
    hiveColumnNames = hiveColumnNames + ",datestr";

    String hiveColumnTypes = HoodieAvroUtils.addMetadataColumnTypes("string,string,string,bigint,string,string");
    hiveColumnTypes = hiveColumnTypes + ",string";
    jobConf.set(hive_metastoreConstants.META_TABLE_COLUMNS, hiveColumnNames);
    jobConf.set(hive_metastoreConstants.META_TABLE_COLUMN_TYPES, hiveColumnTypes);
    jobConf.set(ColumnProjectionUtils.READ_COLUMN_NAMES_CONF_STR, names);
    jobConf.set(ColumnProjectionUtils.READ_COLUMN_IDS_CONF_STR, postions);
    jobConf.set(hive_metastoreConstants.META_TABLE_PARTITION_COLUMNS, "datestr");
    conf.set(hive_metastoreConstants.META_TABLE_COLUMNS, hiveColumnNames);
    conf.set(ColumnProjectionUtils.READ_COLUMN_NAMES_CONF_STR, names);
    conf.set(ColumnProjectionUtils.READ_COLUMN_IDS_CONF_STR, postions);
    conf.set(hive_metastoreConstants.META_TABLE_PARTITION_COLUMNS, "datestr");
    conf.set(hive_metastoreConstants.META_TABLE_COLUMN_TYPES, hiveColumnTypes);
    inputFormat.setConf(conf);
    jobConf.addResource(conf);
  }

  @Test
  public void testInputFormatLoadAndUpdate() throws IOException, InterruptedException {
    // initial commit
    init(hadoopConf, basePath.toString(), HoodieTableType.MERGE_ON_READ);
    String baseInstant = "100";
    int numberOfRecords = 100;
    int numberOfLogRecords = numberOfRecords / 2;
    File partitionDir = InputFormatTestUtil.prepareParquetTable(basePath, schema, 1, numberOfRecords, baseInstant);
    InputFormatTestUtil.commit(basePath, baseInstant);
    // Add the paths
    FileInputFormat.setInputPaths(jobConf, partitionDir.getPath());
    InputSplit[] inputSplits = inputFormat.getSplits(jobConf, 1);
    assertEquals(1, inputSplits.length);

    FileStatus[] files = inputFormat.listStatus(jobConf);
    assertEquals(1, files.length);
    ensureRecordsInCommit("Actual records found different than expected. Expected inserted/updated records: "
        + numberOfRecords + ", Expected total records: " + numberOfRecords, baseInstant, Option.empty(), numberOfRecords,
            numberOfRecords, false);

    // update files or generate new log file
    String newCommitTime = "101";
    HoodieLogFormat.Writer writer =
        writeLogFile(partitionDir, schema, "fileid0", baseInstant, newCommitTime, numberOfLogRecords);
    long size = writer.getCurrentSize();
    writer.close();
    assertTrue(size > 0, "block - size should be > 0");
    InputFormatTestUtil.deltaCommit(basePath, newCommitTime);

    inputSplits = inputFormat.getSplits(jobConf, 1);
    assertEquals(1, inputSplits.length);

    files = inputFormat.listStatus(jobConf);
    assertEquals(1, files.length);

    ensureRecordsInCommit("Actual records found different than expected. Expected inserted/updated records: "
        + numberOfLogRecords + ", Expected total records: " + numberOfRecords, newCommitTime, Option.empty(),
            numberOfLogRecords, numberOfRecords, false);
  }

  private HoodieLogFormat.Writer writeLogFile(
      File partitionDir,
      Schema schema,
      String fileId,
      String baseCommit,
      String newCommit,
      int numberOfRecords) throws InterruptedException, IOException {
    return writeDataBlockToLogFile(partitionDir, schema, fileId, baseCommit, newCommit, numberOfRecords, 0, 0);
  }

  private HoodieLogFormat.Writer writeLogFileWithUniqueUpdates(
          File partitionDir,
          Schema schema,
          String fileId,
          String baseCommit,
          String newCommit,
          int numberOfRecords,
          int offset) throws InterruptedException, IOException {
    return writeDataBlockToLogFile(partitionDir, schema, fileId, baseCommit, newCommit, numberOfRecords, offset, 0);
  }

  private HoodieLogFormat.Writer writeDataBlockToLogFile(File partitionDir, Schema schema, String fileId,
                                                         String baseCommit, String newCommit, int numberOfRecords, int offset, int logVersion)
      throws InterruptedException, IOException {
    HoodieLogFormat.Writer writer = HoodieLogFormat.newWriterBuilder().onParentPath(new Path(partitionDir.getPath()))
        .withFileExtension(HoodieLogFile.DELTA_EXTENSION).withFileId(fileId).withLogVersion(logVersion)
        .withLogWriteToken("1-0-1").overBaseCommit(baseCommit).withFs(fs).build();
    List<IndexedRecord> records = new ArrayList<>();
    for (int i = offset; i < offset + numberOfRecords; i++) {
      records.add(generateAvroRecordFromJson(schema, i, newCommit, "fileid0"));
    }
    Schema writeSchema = records.get(0).getSchema();
    Map<HoodieLogBlock.HeaderMetadataType, String> header = new HashMap<>();
    header.put(HoodieLogBlock.HeaderMetadataType.INSTANT_TIME, newCommit);
    header.put(HoodieLogBlock.HeaderMetadataType.SCHEMA, writeSchema.toString());
    HoodieAvroDataBlock dataBlock = new HoodieAvroDataBlock(records, header);
    writer = writer.appendBlock(dataBlock);
    return writer;
  }

  @Test
  public void testIncrementalSimple() throws IOException {
    // initial commit
    init(hadoopConf, basePath.toString(), HoodieTableType.MERGE_ON_READ);
    String baseInstant = "100";
    int numberOfRecords = 100;
    int numberOfFiles = 10;
    File partitionDir = InputFormatTestUtil.prepareParquetTable(basePath, schema, numberOfFiles, numberOfRecords, baseInstant);
    InputFormatTestUtil.commit(basePath, baseInstant);
    // Add the paths
    FileInputFormat.setInputPaths(jobConf, partitionDir.getPath());
    InputSplit[] inputSplits = inputFormat.getSplits(jobConf, 1);
    assertEquals(numberOfFiles, inputSplits.length);

    FileStatus[] files = inputFormat.listStatus(jobConf);
    assertEquals(numberOfFiles, files.length);
    ensureRecordsInCommit("Actual records found different than expected. Expected inserted/updated records: "
            + numberOfRecords * numberOfFiles + ", Expected total records: " + numberOfRecords * numberOfFiles,
            baseInstant, Option.empty(), numberOfRecords * numberOfFiles,
            numberOfRecords * numberOfFiles, false);

    InputFormatTestUtil.setupIncremental(jobConf, baseInstant, 1);
    files = inputFormat.listStatus(jobConf);
    assertEquals(0, files.length, "We should exclude commit 100 when returning incremental pull with start commit time as 100");
  }

  @Test
  public void testIncrementalWithSingleDeltaCommits() throws IOException, InterruptedException {
    // initial commit
    init(hadoopConf, basePath.toString(), HoodieTableType.MERGE_ON_READ);
    String baseInstant = "100";
    int numberOfRecords = 100;
    int numberOfLogRecords = numberOfRecords / 2;
    int numberOfFiles = 1;
    String partitionPath = "2016/05/01";
    File partitionDir = InputFormatTestUtil.prepareParquetTable(basePath, schema, numberOfFiles, numberOfRecords, baseInstant);
    createCommitFile(basePath, baseInstant, partitionPath);

    // Add the paths
    FileInputFormat.setInputPaths(jobConf, partitionDir.getPath());
    InputSplit[] inputSplits = inputFormat.getSplits(jobConf, 1);
    assertEquals(numberOfFiles, inputSplits.length);

    FileStatus[] files = inputFormat.listStatus(jobConf);
    assertEquals(numberOfFiles, files.length);
    ensureRecordsInCommit("Actual records found different than expected. Expected inserted/updated records: "
            + numberOfRecords * numberOfFiles + ", Expected total records: " + numberOfRecords * numberOfFiles,
            baseInstant, Option.empty(), numberOfRecords * numberOfFiles, numberOfRecords * numberOfFiles,
            false);

    InputFormatTestUtil.setupIncremental(jobConf, baseInstant, 1);
    files = inputFormat.listStatus(jobConf);

    assertEquals(0, files.length, "expected to see zero files");
    inputSplits = inputFormat.getSplits(jobConf, 1);
    assertEquals(0, inputSplits.length);

    // update files or generate new log file
    String newCommitTime = "101";
    HoodieLogFormat.Writer writer =
        writeLogFile(partitionDir, schema, "fileid0", baseInstant, newCommitTime, numberOfLogRecords);
    long size = writer.getCurrentSize();
    writer.close();
    assertTrue(size > 0, "block - size should be > 0");
    createDeltaCommitFile(basePath, newCommitTime, partitionPath, writer);

    InputFormatTestUtil.setupIncremental(jobConf, baseInstant, 1);
    inputSplits = inputFormat.getSplits(jobConf, 1);
    assertEquals(1, inputSplits.length);
    ensureRecordsInCommit("Number of actual records from Incremental querying does not match expected: " + numberOfLogRecords,
            newCommitTime, Option.empty(), numberOfLogRecords, numberOfLogRecords,
            true);
  }

  @Test
  public void testIncrementalWithMultipleDeltaCommits() throws IOException, InterruptedException {
    // initial commit
    init(hadoopConf, basePath.toString(), HoodieTableType.MERGE_ON_READ);
    String baseInstant = "100";
    int numberOfRecords = 100;
    int numberOfLogRecords = numberOfRecords / 4;
    int numberOfFiles = 1;
    String partitionPath = "2016/05/01";
    File partitionDir = InputFormatTestUtil.prepareParquetTable(basePath, schema, numberOfFiles, numberOfRecords, baseInstant);
    createCommitFile(basePath, baseInstant, partitionPath);

    // [updates] generate new log file
    String deltaCommitTime1 = "101";
    HoodieLogFormat.Writer writer =
            writeLogFileWithUniqueUpdates(partitionDir, schema, "fileid0", baseInstant, deltaCommitTime1,
                    numberOfLogRecords, 0);
    long size = writer.getCurrentSize();
    writer.close();
    assertTrue(size > 0, "block - size should be > 0");
    createDeltaCommitFile(basePath, deltaCommitTime1, partitionPath, writer);

    // [updates] generate new log file
    String deltaCommitTime2 = "102";
    writer = writeLogFileWithUniqueUpdates(partitionDir, schema, "fileid0", baseInstant, deltaCommitTime2,
            numberOfLogRecords, 1 * numberOfLogRecords);
    size = writer.getCurrentSize();
    writer.close();
    assertTrue(size > 0, "block - size should be > 0");
    createDeltaCommitFile(basePath, deltaCommitTime2, partitionPath, writer);

    // [updates] generate new log file
    String deltaCommitTime3 = "103";
    writer = writeLogFileWithUniqueUpdates(partitionDir, schema, "fileid0", baseInstant, deltaCommitTime3,
            numberOfLogRecords, 2 * numberOfLogRecords);
    size = writer.getCurrentSize();
    writer.close();
    assertTrue(size > 0, "block - size should be > 0");
    createDeltaCommitFile(basePath, deltaCommitTime3, partitionPath, writer);

    FileInputFormat.setInputPaths(jobConf, partitionDir.getPath());
    InputFormatTestUtil.setupIncremental(jobConf, baseInstant, 2);
    InputSplit[] inputSplits = inputFormat.getSplits(jobConf, 1);
    assertEquals(1, inputSplits.length);
    ensureRecordsInCommit("Number of actual records from Incremental querying does not match expected: " + numberOfLogRecords * 2,
            "102", Option.empty(), numberOfLogRecords * 2, numberOfLogRecords * 2,
            true);
  }



  /*
  @Test
  public void testIncrementalWithMultipleSlices() throws IOException, InterruptedException {
    // initial commit
    HoodieTestUtils.init(hadoopConf, basePath.getRoot().getAbsolutePath(), HoodieTableType.MERGE_ON_READ);
    String baseInstant = "100";
    int numberOfRecords = 100;
    int numberOfLogRecords = numberOfRecords / 2;
    int numberOfFiles = 10;
    String partitionPath = "2016/05/01";
    File partitionDir = InputFormatTestUtil.prepareParquetTable(basePath, schema, numberOfFiles, numberOfRecords, baseInstant);
    createCommitFile(basePath, baseInstant, partitionPath);

    // Add the paths
    FileInputFormat.setInputPaths(jobConf, partitionDir.getPath());
    InputSplit[] inputSplits = inputFormat.getSplits(jobConf, 1);
    assertEquals(numberOfFiles, inputSplits.length);

    FileStatus[] files = inputFormat.listStatus(jobConf);
    assertEquals(numberOfFiles, files.length);
    ensureRecordsInCommit("Actual records found different than expected. Expected inserted/updated records: "
            + numberOfRecords * numberOfFiles + ", Expected total records: " + numberOfRecords * numberOfFiles, baseInstant,
        numberOfRecords * numberOfFiles, numberOfRecords * numberOfFiles);

    InputFormatTestUtil.setupIncremental(jobConf, baseInstant, 1);
    files = inputFormat.listStatus(jobConf);

    //TODO SUDHA this should pass once fixing list status
    //assertEquals("List status should return the files corresponding to start time in incremental filter", 10, files.length);
    inputSplits = inputFormat.getSplits(jobConf, 1);
    assertEquals(0, inputSplits.length);

    // update files or generate new log file
    String newCommitTime = "101";
    HoodieLogFormat.Writer writer =
        writeLogFile(partitionDir, schema, "fileid0", baseInstant, newCommitTime, numberOfLogRecords);
    long size = writer.getCurrentSize();
    writer.close();
    assertTrue("block - size should be > 0", size > 0);
    createDeltaCommitFile(basePath, newCommitTime, partitionPath);

    InputFormatTestUtil.setupIncremental(jobConf, baseInstant, 1);
    files = inputFormat.listStatus(jobConf);

    //TODO SUDHA this should pass once fixing list status
    //assertEquals("List status should return the files corresponding to start time in incremental filter", 10, files.length);
    inputSplits = inputFormat.getSplits(jobConf, 1);

    // TODO SUDHA This should pass once the getSplits is fixed
    //assertEquals(1, inputSplits.length);
    /*
    // Add the paths
    FileInputFormat.setInputPaths(jobConf, partitionDir.getPath());
    // update files
    InputFormatTestUtil.simulateUpdates(partitionDir, "100", 5, "200", false);
    createCommitFile(basePath, "200", "2016/05/01");

    InputFormatTestUtil.simulateUpdates(partitionDir, "100", 4, "300", false);
    createCommitFile(basePath, "300", "2016/05/01");

    InputFormatTestUtil.simulateUpdates(partitionDir, "100", 3, "400", false);
    createCommitFile(basePath, "400", "2016/05/01");

    InputFormatTestUtil.simulateUpdates(partitionDir, "100", 2, "500", false);
    createCommitFile(basePath, "500", "2016/05/01");

    InputFormatTestUtil.simulateUpdates(partitionDir, "100", 1, "600", false);
    createCommitFile(basePath, "600", "2016/05/01");

    InputFormatTestUtil.setupIncremental(jobConf, "100", 1);
    FileStatus[] files = inputFormat.listStatus(jobConf);
    assertEquals("Pulling 1 commit from 100, should get us the 5 files committed at 200", 5, files.length);
    ensureFilesInCommit("Pulling 1 commit from 100, should get us the 5 files committed at 200", files, "200", 5);

    InputFormatTestUtil.setupIncremental(jobConf, "100", 3);
    files = inputFormat.listStatus(jobConf);

    assertEquals("Pulling 3 commits from 100, should get us the 3 files from 400 commit, 1 file from 300 "
        + "commit and 1 file from 200 commit", 5, files.length);
    ensureFilesInCommit("Pulling 3 commits from 100, should get us the 3 files from 400 commit", files, "400", 3);
    ensureFilesInCommit("Pulling 3 commits from 100, should get us the 1 files from 300 commit", files, "300", 1);
    ensureFilesInCommit("Pulling 3 commits from 100, should get us the 1 files from 200 commit", files, "200", 1);

    InputFormatTestUtil.setupIncremental(jobConf, "100", HoodieHiveUtil.MAX_COMMIT_ALL);
    files = inputFormat.listStatus(jobConf);

    assertEquals("Pulling all commits from 100, should get us the 1 file from each of 200,300,400,500,400 commits",
        5, files.length);
    ensureFilesInCommit("Pulling all commits from 100, should get us the 1 files from 600 commit", files, "600", 1);
    ensureFilesInCommit("Pulling all commits from 100, should get us the 1 files from 500 commit", files, "500", 1);
    ensureFilesInCommit("Pulling all commits from 100, should get us the 1 files from 400 commit", files, "400", 1);
    ensureFilesInCommit("Pulling all commits from 100, should get us the 1 files from 300 commit", files, "300", 1);
    ensureFilesInCommit("Pulling all commits from 100, should get us the 1 files from 200 commit", files, "200", 1);
  }
  */

  private void createCommitFile(java.nio.file.Path basePath, String commitNumber, String partitionPath)
      throws IOException {
    List<HoodieWriteStat> writeStats = generateFakeHoodieWriteStat(1);
    HoodieCommitMetadata commitMetadata = new HoodieCommitMetadata();
    writeStats.forEach(stat -> commitMetadata.addWriteStat(partitionPath, stat));
    java.nio.file.Path file = Files.createFile(basePath.resolve(Paths.get(".hoodie", commitNumber + ".commit")));
    FileOutputStream fileOutputStream = new FileOutputStream(file.toAbsolutePath().toString());
    fileOutputStream.write(commitMetadata.toJsonString().getBytes(StandardCharsets.UTF_8));
    fileOutputStream.flush();
    fileOutputStream.close();
  }

  private void createDeltaCommitFile(java.nio.file.Path basePath, String commitNumber, String partitionPath, HoodieLogFormat.Writer writer)
      throws IOException {
    HoodieWriteStat writeStat = generateFakeHoodieWriteStat(basePath, writer.getLogFile());
    HoodieCommitMetadata commitMetadata = new HoodieCommitMetadata();
    commitMetadata.addWriteStat(partitionPath, writeStat);
    java.nio.file.Path file = Files.createFile(basePath.resolve(Paths.get(".hoodie/", commitNumber + ".deltacommit")));
    FileOutputStream fileOutputStream = new FileOutputStream(file.toAbsolutePath().toString());
    fileOutputStream.write(commitMetadata.toJsonString().getBytes(StandardCharsets.UTF_8));
    fileOutputStream.flush();
    fileOutputStream.close();
  }

  private void ensureRecordsInCommit(String msg, String newCommitTime, Option<String> beginCommitTime, int expectedNumberOfRecordsInCommit,
                                     int totalExpected, boolean incrementalQuery) throws IOException {
    int actualCount = 0;
    int totalCount = 0;
    InputSplit[] splits = inputFormat.getSplits(jobConf, 1);
    for (InputSplit split : splits) {
      RecordReader<NullWritable, ArrayWritable> recordReader = inputFormat.getRecordReader(split, jobConf, null);
      NullWritable key = recordReader.createKey();
      ArrayWritable writable = recordReader.createValue();

      while (recordReader.next(key, writable)) {
        // writable returns an array with schema like org.apache.hudi.common.util.TestRecord.java
        // Take the commit time and compare with the one we are interested in
        Writable[] values = writable.get();
        String commitTime = values[HOODIE_COMMIT_TIME_COL_POS].toString();
        if (!incrementalQuery) {
          if (newCommitTime.equals(commitTime)) {
            actualCount++;
          }
        } else {
          boolean endCommitTimeMatches = HoodieTimeline.compareTimestamps(newCommitTime, HoodieTimeline.GREATER_THAN_OR_EQUALS, commitTime);
          boolean beginCommitTimeMatches = !beginCommitTime.isPresent() || HoodieTimeline.compareTimestamps(beginCommitTime.get(), HoodieTimeline.LESSER_THAN, commitTime);
          assertTrue(beginCommitTimeMatches && endCommitTimeMatches);
          actualCount++;
        }
        totalCount++;
      }
    }
    assertEquals(expectedNumberOfRecordsInCommit, actualCount, msg);
    assertEquals(totalExpected, totalCount, msg);
  }

  public static void ensureFilesInCommit(String msg, FileStatus[] files, String commit, int expected) {
    int count = 0;
    for (FileStatus file : files) {
      String commitTs = FSUtils.getCommitTime(file.getPath().getName());
      if (commit.equals(commitTs)) {
        count++;
      }
    }
    assertEquals(expected, count, msg);
  }
}
