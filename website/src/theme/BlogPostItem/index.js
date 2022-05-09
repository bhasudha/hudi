/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import clsx from 'clsx';
import {MDXProvider} from '@mdx-js/react';
import Translate, {translate} from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import {useBaseUrlUtils} from '@docusaurus/useBaseUrl';
import {usePluralForm} from '@docusaurus/theme-common';
import MDXComponents from '@theme/MDXComponents';
import EditThisPage from '@theme/EditThisPage';
import styles from './styles.module.css';
import TagsListInline from '@theme/TagsListInline';
import BlogPostAuthors from '@theme/BlogPostAuthors'; // Very simple pluralization: probably good enough for now
import Tag from '@theme/Tag';

function useReadingTimePlural() {
  const {selectMessage} = usePluralForm();
  return (readingTimeFloat) => {
    const readingTime = Math.ceil(readingTimeFloat);
    return selectMessage(
      readingTime,
      translate(
        {
          id: 'theme.blog.post.readingTime.plurals',
          description:
            'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: 'One min read|{readingTime} min read',
        },
        {
          readingTime,
        },
      ),
    );
  };
}

function BlogPostItem(props) {
  const readingTimePlural = useReadingTimePlural();
  const {withBaseUrl} = useBaseUrlUtils();
  const {
    children,
    frontMatter,
    assets,
    metadata,
    truncated,
    isBlogPostPage = false,
  } = props;
  const {
    date,
    formattedDate,
    permalink,
    tags,
    readingTime,
    title,
    editUrl,
    authors,
  } = metadata;
  const image = assets.image ?? frontMatter.image ?? '/assets/images/logo-big.png';
  const truncatedPost = !isBlogPostPage && truncated;
  const tagsExists = tags.length > 0;
  const tagsList = () => {
      return (
          <>
            <ul className={clsx(styles.tags, styles.authorTimeTags, 'padding--none', 'margin-left--sm')}>
              {tags.map(({label, permalink: tagPermalink}) => (
                <li key={tagPermalink} className={styles.tag}>
                  <Tag className={clsx(styles.greyLink)} name={label} permalink={tagPermalink} />
                </li>
              ))}
            </ul>
          </>
        );
  }
  const AuthorsList = () => {
  
        const authorsCount = authors.length;
        if (authorsCount === 0) {
            return  (
                <div className="row margin-top--md margin-bottom--sm">
                    <time dateTime={date} itemProp="datePublished">
                        {formattedDate}
                    </time>
                </div>
            )
           
        }

        return (
            <div className={clsx(styles.authorTimeTags, "row margin-top--sm margin-bottom--sm 'margin-vert--md'")}>
                <time dateTime={date} itemProp="datePublished">
                    {formattedDate}
                </time>
                 {authors.map((author, idx) => (
                  
                  <div className={clsx('col col--3')} key={idx}>
                        <div className="avatar margin-bottom--sm">
                            {author.name && (
                                    <div>
                                      <Link href={author.url} itemProp="url">
                                        <span className={clsx(styles.authorsList)} itemProp="name">{author.name}</span>
                                      </Link>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                  ))}
            </div>
          );
    }
  const renderPostTile = () => {
      const TitleHeading = isBlogPostPage ? 'h1' : 'h2';
      return (
        <header>
         { image && (
             <div className="col blogThumbnail" itemProp="blogThumbnail">
               <Link itemProp="url" to={permalink}>
                 <img
                  src={withBaseUrl(image, {
                      absolute: true,
                  })}
                 />
               </Link>
              </div>
         )}
          <TitleHeading className={styles.blogPostTitle} itemProp="headline">
            {(
              <Link itemProp="url" to={permalink}>
                {title}
              </Link>
            )}
          </TitleHeading>
         
            {AuthorsList()}
         
        {tagsExists ?
        ( <div
            className={clsx(styles.blogPostData, styles.authorTimeTags, 'margin-vert--md')}>
            {tagsList()}
            {typeof readingTime !== 'undefined' && (
              <>
                {' · '}
                {readingTimePlural(readingTime)}
              </>
            )}
          </div>
        ) :
        ( <div
           className={clsx(styles.blogPostData, styles.authorTimeTags, 'margin-vert--md')}>
           {typeof readingTime !== 'undefined' && (
              <>
                {readingTimePlural(readingTime)}
              </>
            )}
          </div>
        )
        }
        </header>
      );
}

  const renderPostHeader = () => {
    const TitleHeading = isBlogPostPage ? 'h1' : 'h2';
    return (
      <header>
       {!isBlogPostPage && image && (
           <div className="col blogThumbnail" itemProp="blogThumbnail">
             <Link itemProp="url" to={permalink}>
               <img
                src={withBaseUrl(image, {
                    absolute: true,
                })}
               />
             </Link>
            </div>
       )}
        <TitleHeading className={styles.blogPostTitle} itemProp="headline">
          {isBlogPostPage ? (
            title
          ) : (
            <Link itemProp="url" to={permalink}>
              {title}
            </Link>
          )}
        </TitleHeading>
        <div className={clsx(styles.blogPostData, 'margin-vert--md')}>
          <time dateTime={date} itemProp="datePublished">
            {formattedDate}
          </time>

          {typeof readingTime !== 'undefined' && (
            <>
              {' · '}
              {readingTimePlural(readingTime)}
            </>
          )}
        {(
            <BlogPostAuthors authors={authors} assets={assets} />
        )}
        {(
            <TagsListInline tags={tags} />
        )}
        </div>
      </header>
    );
  };

  return (
    <article
      className={!isBlogPostPage ? 'blog-list-item' : undefined}
      itemProp="blogPost"
      itemScope
      itemType="http://schema.org/BlogPosting">
      {isBlogPostPage ? (renderPostHeader()) : (renderPostTile())}


        {isBlogPostPage && (
            <div className="markdown" itemProp="articleBody">
                <MDXProvider components={MDXComponents}>{children}</MDXProvider>
            </div>
        )}

      {(tagsExists || truncated) && (isBlogPostPage) && (
        <footer
          className={clsx('row docusaurus-mt-lg', {
            [styles.blogPostDetailsFull]: isBlogPostPage,
          })}>
          {tagsExists && (
            <div
              className={clsx('col', {
                'col--9': truncatedPost,
              })}>
              <TagsListInline tags={tags} />
            </div>
          )}

          {isBlogPostPage && editUrl && (
            <div className="col margin-top--sm">
              <EditThisPage editUrl={editUrl} />
            </div>
          )}
        </footer>
      )}
    </article>
  );
}

export default BlogPostItem;
