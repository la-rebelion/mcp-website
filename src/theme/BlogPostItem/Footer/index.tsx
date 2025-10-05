import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import {ThemeClassNames} from '@docusaurus/theme-common';
import EditMetaRow from '@theme/EditMetaRow';
import TagsListInline from '@theme/TagsListInline';
import ReadMoreLink from '@theme/BlogPostItem/Footer/ReadMoreLink';

export default function BlogPostItemFooter(): ReactNode {
  const {metadata, isBlogPostPage, frontMatter} = useBlogPost();
  const {
    tags,
    title,
    editUrl,
    hasTruncateMarker,
    lastUpdatedBy,
    lastUpdatedAt,
  } = metadata;

  const truncatedPost = !isBlogPostPage && hasTruncateMarker;
  const tagsExists = tags.length > 0;
  const renderFooter = tagsExists || truncatedPost || editUrl || isBlogPostPage;

  if (!renderFooter) {
    return null;
  }

  const series = (frontMatter as any).series as
    | string
    | {name: string; slug?: string}
    | undefined;
  const seriesOrder = (frontMatter as any).seriesOrder as number | undefined;
  const seriesPosts = (frontMatter as any).seriesPosts as
    | {title: string; permalink: string}[]
    | undefined;

  function SeriesBox(): ReactNode | null {
    if (!isBlogPostPage || !series) return null;
    const name = typeof series === 'string' ? series : series.name;
    const slug =
      typeof series === 'string'
        ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        : (series.slug || series.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    return (
      <aside className="mcpSeriesBox">
        <div className="mcpSeriesHeader">
          <span className="mcpPill">Series</span>
          <strong>{name}</strong>
          {typeof seriesOrder === 'number' && (
            <span className="mcpSeriesOrder">Part {seriesOrder}</span>
          )}
        </div>
        {seriesPosts?.length ? (
          <ol className="mcpSeriesList">
            {seriesPosts.map((p, i) => (
              <li key={i}>
                <a href={p.permalink}>{p.title}</a>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mcpSeriesHint">
            Browse the series: <a href={`/tags/${slug}`}>/tags/{slug}</a>
          </p>
        )}
      </aside>
    );
  }

  if (isBlogPostPage) {
    const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy);
    return (
      <footer className="docusaurus-mt-lg">
        <SeriesBox />
        {tagsExists && (
          <div
            className={clsx(
              'row',
              'margin-top--sm',
              ThemeClassNames.blog.blogFooterEditMetaRow,
            )}>
            <div className="col">
              <TagsListInline tags={tags} />
            </div>
          </div>
        )}
        {canDisplayEditMetaRow && (
          <EditMetaRow
            className={clsx(
              'margin-top--sm',
              ThemeClassNames.blog.blogFooterEditMetaRow,
            )}
            editUrl={editUrl}
            lastUpdatedAt={lastUpdatedAt}
            lastUpdatedBy={lastUpdatedBy}
          />
        )}
      </footer>
    );
  }

  return (
    <footer className="row docusaurus-mt-lg">
      {tagsExists && (
        <div className={clsx('col', {'col--9': truncatedPost})}>
          <TagsListInline tags={tags} />
        </div>
      )}
      {truncatedPost && (
        <div
          className={clsx('col text--right', {
            'col--3': tagsExists,
          })}>
          <ReadMoreLink blogPostTitle={title} to={metadata.permalink} />
        </div>
      )}
    </footer>
  );
}

