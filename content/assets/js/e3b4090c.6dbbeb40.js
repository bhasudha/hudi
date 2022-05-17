"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[51845],{3905:function(e,t,a){a.d(t,{Zo:function(){return u},kt:function(){return h}});var r=a(67294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},i=Object.keys(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var d=r.createContext({}),s=function(e){var t=r.useContext(d),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},u=function(e){var t=s(e.components);return r.createElement(d.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,i=e.originalType,d=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=s(a),h=n,m=p["".concat(d,".").concat(h)]||p[h]||c[h]||i;return a?r.createElement(m,o(o({ref:t},u),{},{components:a})):r.createElement(m,o({ref:t},u))}));function h(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=a.length,o=new Array(i);o[0]=p;var l={};for(var d in t)hasOwnProperty.call(t,d)&&(l[d]=t[d]);l.originalType=e,l.mdxType="string"==typeof e?e:n,o[1]=l;for(var s=2;s<i;s++)o[s]=a[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,a)}p.displayName="MDXCreateElement"},17595:function(e,t,a){a.r(t),a.d(t,{assets:function(){return u},contentTitle:function(){return d},default:function(){return h},frontMatter:function(){return l},metadata:function(){return s},toc:function(){return c}});var r=a(87462),n=a(63366),i=(a(67294),a(3905)),o=["components"],l={title:"Adding support for Virtual Keys in Hudi",excerpt:"Supporting Virtual keys in Hudi for reducing storage overhead",author:"shivnarayan",category:"blog"},d=void 0,s={permalink:"/blog/2021/08/18/virtual-keys",editUrl:"https://github.com/apache/hudi/edit/asf-site/website/blog/blog/2021-08-18-virtual-keys.md",source:"@site/blog/2021-08-18-virtual-keys.md",title:"Adding support for Virtual Keys in Hudi",description:"Apache Hudi helps you build and manage data lakes with different table types, config knobs to cater to everyone's need.",date:"2021-08-18T00:00:00.000Z",formattedDate:"August 18, 2021",tags:[],readingTime:4.95,truncated:!0,authors:[{name:"shivnarayan"}],prevItem:{title:"Improving Marker Mechanism in Apache Hudi",permalink:"/blog/2021/08/18/improving-marker-mechanism"},nextItem:{title:"Schema evolution with DeltaStreamer using KafkaSource",permalink:"/blog/2021/08/16/kafka-custom-deserializer"}},u={authorsImageUrls:[void 0]},c=[{value:"Configurations",id:"configurations",children:[{value:"Supported Key Generators with CopyOnWrite(COW) table:",id:"supported-key-generators-with-copyonwritecow-table",children:[],level:3},{value:"Supported Key Generators with MergeOnRead(MOR) table:",id:"supported-key-generators-with-mergeonreadmor-table",children:[],level:3},{value:"Supported Index types:",id:"supported-index-types",children:[],level:3}],level:2},{value:"Supported Operations",id:"supported-operations",children:[],level:2},{value:"Sample Output",id:"sample-output",children:[],level:2},{value:"Incremental Queries",id:"incremental-queries",children:[],level:2},{value:"Conclusion",id:"conclusion",children:[],level:2}],p={toc:c};function h(e){var t=e.components,a=(0,n.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Apache Hudi helps you build and manage data lakes with different table types, config knobs to cater to everyone's need.\nHudi adds per record metadata fields like ",(0,i.kt)("inlineCode",{parentName:"p"},"_hoodie_record_key"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"_hoodie_partition path"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"_hoodie_commit_time")," which serves multiple purposes.\nThey assist in avoiding re-computing the record key, partition path during merges, compaction and other table operations\nand also assists in supporting ",(0,i.kt)("a",{parentName:"p",href:"/blog/2021/07/21/streaming-data-lake-platform#readers"},"record-level")," incremental queries (in comparison to other table formats, that merely track files).\nIn addition, it ensures data quality by ensuring unique key constraints are enforced even if the key field changes for a given table, during its lifetime.\nBut one of the repeated asks from the community is to leverage existing fields and not to add additional meta fields, for simple use-cases where such benefits are not desired or key changes are very rare.  "),(0,i.kt)("h1",{id:"virtual-key-support"},"Virtual Key support"),(0,i.kt)("p",null,"Hudi now supports virtual keys, where Hudi meta fields can be computed on demand from the data fields. Currently, the meta fields are\ncomputed once and stored as per record metadata and re-used across various operations. If one does not need incremental query support,\nthey can start leveraging Hudi's Virtual key support and still go about using Hudi to build and manage their data lake to reduce the storage\noverhead due to per record metadata. "),(0,i.kt)("h2",{id:"configurations"},"Configurations"),(0,i.kt)("p",null,"Virtual keys can be enabled for a given table using the below config. When set to ",(0,i.kt)("inlineCode",{parentName:"p"},"hoodie.populate.meta.fields=false"),",\nHudi will use virtual keys for the corresponding table. Default value for this config is ",(0,i.kt)("inlineCode",{parentName:"p"},"true"),", which means, all  meta fields will be added by default."),(0,i.kt)("p",null,"Once virtual keys are enabled, it can't be disabled for a given hudi table, because already stored records may not have\nthe meta fields populated. But if you have an existing table from an older version of hudi, virtual keys can be enabled.\nAnother constraint w.r.t virtual key support is that, Key generator properties for a given table cannot be changed through\nthe course of the lifecycle of a given hudi table. In this model, the user also shares responsibility of ensuring uniqueness\nof key within a table. For instance, if you configure record key to point to ",(0,i.kt)("inlineCode",{parentName:"p"},"field_5")," for few batches of write and later switch to ",(0,i.kt)("inlineCode",{parentName:"p"},"field_10"),",\nHudi cannot guarantee uniqueness of key, since older writes could have had duplicates for ",(0,i.kt)("inlineCode",{parentName:"p"},"field_10"),". "),(0,i.kt)("p",null,"With virtual keys, keys will have to be re-computed everytime when in need (merges, compaction, MOR snapshot read). Hence we\nsupport virtual keys for all built-in key generators on Copy-On-Write tables. Supporting all key generators on Merge-On-Read table\nwould entail reading all fields out of base and delta logs, sacrificing core columnar query performance, which will be prohibitively expensive\nfor users. Thus, we support only simple key generators (the default key generator, where both record key and partition path refer\nto an existing field ) for now."),(0,i.kt)("h3",{id:"supported-key-generators-with-copyonwritecow-table"},"Supported Key Generators with CopyOnWrite(COW) table:"),(0,i.kt)("p",null,"SimpleKeyGenerator, ComplexKeyGenerator, CustomKeyGenerator, TimestampBasedKeyGenerator and NonPartitionedKeyGenerator. "),(0,i.kt)("h3",{id:"supported-key-generators-with-mergeonreadmor-table"},"Supported Key Generators with MergeOnRead(MOR) table:"),(0,i.kt)("p",null,"SimpleKeyGenerator"),(0,i.kt)("h3",{id:"supported-index-types"},"Supported Index types:"),(0,i.kt)("p",null,'Only "SIMPLE" and "GLOBAL_SIMPLE" index types are supported in the first cut. We plan to add support for other index\n(BLOOM, etc) in future releases. '),(0,i.kt)("h2",{id:"supported-operations"},"Supported Operations"),(0,i.kt)("p",null,"All existing features are supported for a hudi table with virtual keys, except the incremental\nqueries. Which means, cleaning, archiving, metadata table, clustering, etc can be enabled for a hudi table with\nvirtual keys enabled. So, you are able to merely use Hudi as a transactional table format with all the awesome\ntable service runtimes and platform services, if you wish to do so, without incurring any overheads associated with\nsupport for incremental data processing."),(0,i.kt)("h2",{id:"sample-output"},"Sample Output"),(0,i.kt)("p",null,"As called out earlier, one has to set ",(0,i.kt)("inlineCode",{parentName:"p"},"hoodie.populate.meta.fields=false")," to enable virtual keys. Let's see the\ndifference between records of a hudi table with and without virtual keys."),(0,i.kt)("p",null,"Here are some sample records for a regular hudi table (virtual keys disabled)"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"+--------------------+--------------------------------------+--------------------------------------+---------+---------+-------------------+\n|_hoodie_commit_time |           _hoodie_record_key         |        _hoodie_partition_path        |  rider  | driver  |        fare       |\n+--------------------+--------------------------------------+--------------------------------------+---------+---------+-------------------+\n|   20210825154123   | eb7819f1-6f04-429d-8371-df77620b9527 | americas/united_states/san_francisco |rider-284|driver-284|98.3428192817987  |\n|   20210825154123   | 37ea44f1-fda7-4ec4-84de-f43f5b5a4d84 | americas/united_states/san_francisco |rider-213|driver-213|19.179139106643607|\n|   20210825154123   | aa601d6b-7cc5-4b82-9687-675d0081616e | americas/united_states/san_francisco |rider-213|driver-213|93.56018115236618 |\n|   20210825154123   | 494bc080-881c-48be-8f8a-8f1739781816 | americas/united_states/san_francisco |rider-284|driver-284|90.9053809533154  |\n|   20210825154123   | 09573277-e1c1-4cdd-9b45-57176f184d4d | americas/united_states/san_francisco |rider-284|driver-284|49.527694252432056|\n|   20210825154123   | c9b055ed-cd28-4397-9704-93da8b2e601f | americas/brazil/sao_paulo            |rider-213|driver-213|43.4923811219014  |\n|   20210825154123   | e707355a-b8c0-432d-a80f-723b93dc13a8 | americas/brazil/sao_paulo            |rider-284|driver-284|63.72504913279929 |\n|   20210825154123   | d3c39c9e-d128-497a-bf3e-368882f45c28 | americas/brazil/sao_paulo            |rider-284|driver-284|91.99515909032544 |\n|   20210825154123   | 159441b0-545b-460a-b671-7cc2d509f47b | asia/india/chennai                   |rider-284|driver-284|9.384124531808036 |\n|   20210825154123   | 16031faf-ad8d-4968-90ff-16cead211d3c | asia/india/chennai                   |rider-284|driver-284|90.25710109008239 |\n+--------------------+--------------------------------------+--------------------------------------+---------+----------+------------------+\n")),(0,i.kt)("p",null,"And here are some sample records for a hudi table with virtual keys enabled."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"+--------------------+------------------------+-------------------------+---------+---------+-------------------+\n|_hoodie_commit_time |    _hoodie_record_key  |  _hoodie_partition_path |  rider  | driver  |        fare       |\n+--------------------+------------------------+-------------------------+---------+---------+-------------------+\n|        null        |            null        |          null           |rider-284|driver-284|98.3428192817987  |\n|        null        |            null        |          null           |rider-213|driver-213|19.179139106643607|\n|        null        |            null        |          null           |rider-213|driver-213|93.56018115236618 |\n|        null        |            null        |          null           |rider-284|driver-284|90.9053809533154  |\n|        null        |            null        |          null           |rider-284|driver-284|49.527694252432056|\n|        null        |            null        |          null           |rider-213|driver-213|43.4923811219014  |\n|        null        |            null        |          null           |rider-284|driver-284|63.72504913279929 |\n|        null        |            null        |          null           |rider-284|driver-284|91.99515909032544 |\n|        null        |            null        |          null           |rider-284|driver-284|9.384124531808036 |\n|        null        |            null        |          null           |rider-284|driver-284|90.25710109008239 |\n+--------------------+------------------------+-------------------------+---------+----------+------------------+\n")),(0,i.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"As you could see, all meta fields are null in storage, but all users fields remain intact similar to a regular table."))),(0,i.kt)("h2",{id:"incremental-queries"},"Incremental Queries"),(0,i.kt)("p",null,"Since hudi does not maintain any metadata (like commit time at a record level) for a table with virtual keys enabled,",(0,i.kt)("br",{parentName:"p"}),"\n","incremental queries are not supported. An exception will be thrown as below when an incremental query is triggered for such\na table."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'scala> val tripsIncrementalDF = spark.read.format("hudi").\n     |   option(QUERY_TYPE_OPT_KEY, QUERY_TYPE_INCREMENTAL_OPT_VAL).\n     |   option(BEGIN_INSTANTTIME_OPT_KEY, "20210827180901").load(basePath)\norg.apache.hudi.exception.HoodieException: Incremental queries are not supported when meta fields are disabled\n  at org.apache.hudi.IncrementalRelation.<init>(IncrementalRelation.scala:69)\n  at org.apache.hudi.DefaultSource.createRelation(DefaultSource.scala:120)\n  at org.apache.hudi.DefaultSource.createRelation(DefaultSource.scala:67)\n  at org.apache.spark.sql.execution.datasources.DataSource.resolveRelation(DataSource.scala:344)\n  at org.apache.spark.sql.DataFrameReader.loadV1Source(DataFrameReader.scala:297)\n  at org.apache.spark.sql.DataFrameReader.$anonfun$load$2(DataFrameReader.scala:286)\n  at scala.Option.getOrElse(Option.scala:189)\n  at org.apache.spark.sql.DataFrameReader.load(DataFrameReader.scala:286)\n  at org.apache.spark.sql.DataFrameReader.load(DataFrameReader.scala:232)\n  ... 61 elided\n')),(0,i.kt)("h2",{id:"conclusion"},"Conclusion"),(0,i.kt)("p",null,"Hope this blog was useful for you to learn yet another feature in Apache Hudi. If you are interested in\nHudi and looking to contribute, do check out ",(0,i.kt)("a",{parentName:"p",href:"https://hudi.apache.org/contribute/get-involved"},"here"),"."))}h.isMDXComponent=!0}}]);