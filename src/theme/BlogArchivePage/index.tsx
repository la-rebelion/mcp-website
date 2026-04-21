/**
 * Swizzled BlogArchivePage — card-based archive with search, year, and tag filters.
 * Replaces the default year-bucketed list with a rich, filterable card grid.
 */
import React, { useMemo, useState, type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import { PageMetadata } from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import type { ArchiveBlogPost, Props } from '@theme/BlogArchivePage';
import '@site/src/css/archive.css';

// ─── Types ───────────────────────────────────────────────────────────────────

type TagEntry = { label: string; permalink: string; count: number };

type FrontMatter = {
  image?: string;
  keywords?: string[];
  [key: string]: unknown;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getYear(post: ArchiveBlogPost): string {
  return new Date(post.metadata.date).getFullYear().toString();
}

function getAllYears(posts: readonly ArchiveBlogPost[]): string[] {
  const years = new Set(posts.map(getYear));
  return Array.from(years).sort((a, b) => Number(b) - Number(a));
}

function getAllTags(posts: readonly ArchiveBlogPost[]): TagEntry[] {
  const map = new Map<string, TagEntry>();
  for (const post of posts) {
    for (const tag of post.metadata.tags) {
      const entry = map.get(tag.label);
      if (entry) entry.count++;
      else map.set(tag.label, { label: tag.label, permalink: tag.permalink, count: 1 });
    }
  }
  return Array.from(map.values()).sort((a, b) => b.count - a.count);
}

function filterPosts(
  posts: readonly ArchiveBlogPost[],
  search: string,
  year: string | null,
  activeTags: ReadonlySet<string>,
): ArchiveBlogPost[] {
  const q = search.trim().toLowerCase();
  return posts.filter((post) => {
    const { metadata } = post;
    if (year && getYear(post) !== year) return false;
    if (activeTags.size > 0 && !metadata.tags.some((t) => activeTags.has(t.label))) return false;
    if (q) {
      const fm = metadata.frontMatter as FrontMatter;
      const keywords = (fm.keywords ?? []).join(' ');
      const haystack = [
        metadata.title,
        metadata.description,
        metadata.tags.map((t) => t.label).join(' '),
        keywords,
      ].join(' ').toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

// ─── Author avatar ────────────────────────────────────────────────────────────

function AuthorAvatar({ name, imageURL }: { name?: string; imageURL?: string }) {
  const initials = name
    ? name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
    : '?';
  return (
    <span className="mcpArchiveAvatar" title={name}>
      {imageURL ? (
        <img src={imageURL} alt={name ?? ''} loading="lazy" />
      ) : (
        initials
      )}
    </span>
  );
}

// ─── Post card ────────────────────────────────────────────────────────────────

function ArchivePostCard({ post }: { post: ArchiveBlogPost }) {
  const { metadata } = post;
  const fm = metadata.frontMatter as FrontMatter;
  const image = fm.image;
  const rawKeywords = (fm.keywords ?? []) as string[];

  const dateStr = new Date(metadata.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });

  // Only show keywords that aren't already shown as tags
  const tagLabels = new Set(metadata.tags.map((t) => t.label.toLowerCase()));
  const extraKeywords = rawKeywords
    .filter((k) => !tagLabels.has(k.toLowerCase()))
    .slice(0, 4);

  const primaryAuthor = metadata.authors?.[0];

  return (
    <article className="mcpArchiveCard">
      {image && (
        <Link to={metadata.permalink} className="mcpArchiveCardImg" tabIndex={-1} aria-hidden="true">
          <img src={image} alt="" loading="lazy" />
        </Link>
      )}

      <div className="mcpArchiveCardBody">
        {/* Meta row */}
        <div className="mcpArchiveCardMeta">
          {primaryAuthor && (
            <span className="mcpArchiveCardAuthor">
              <AuthorAvatar name={primaryAuthor.name} imageURL={primaryAuthor.imageURL} />
            </span>
          )}
          <time dateTime={String(metadata.date)}>{dateStr}</time>
          {metadata.readingTime != null && (
            <span aria-label={`${Math.ceil(metadata.readingTime)} minutes read`}>
              · {Math.ceil(metadata.readingTime)} min
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="mcpArchiveCardTitle">
          <Link to={metadata.permalink}>{metadata.title}</Link>
        </h2>

        {/* Description */}
        {metadata.description && (
          <p className="mcpArchiveCardDesc">{metadata.description}</p>
        )}

        {/* Push tags to bottom */}
        <div className="mcpArchiveCardSpacer" />

        {/* Tags */}
        {metadata.tags.length > 0 && (
          <div className="mcpArchiveCardTags">
            {metadata.tags.slice(0, 5).map((tag) => (
              <Link key={tag.label} to={tag.permalink} className="mcpArchiveTag">
                #{tag.label}
              </Link>
            ))}
          </div>
        )}

        {/* Extra keywords */}
        {extraKeywords.length > 0 && (
          <div className="mcpArchiveCardKeywords">
            {extraKeywords.map((kw) => (
              <span key={kw} className="mcpArchiveKeyword">{kw}</span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function BlogArchivePage({ archive }: Props): ReactNode {
  const { blogPosts } = archive;
  const [search, setSearch] = useState('');
  const [activeYear, setActiveYear] = useState<string | null>(null);
  const [activeTags, setActiveTags] = useState<ReadonlySet<string>>(new Set());

  const allYears = useMemo(() => getAllYears(blogPosts), [blogPosts]);
  const allTags = useMemo(() => getAllTags(blogPosts), [blogPosts]);

  const filtered = useMemo(
    () => filterPosts(blogPosts, search, activeYear, activeTags),
    [blogPosts, search, activeYear, activeTags],
  );

  const toggleTag = (label: string) => {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const clearFilters = () => {
    setSearch('');
    setActiveYear(null);
    setActiveTags(new Set());
  };

  const hasFilters = search.trim() !== '' || activeYear !== null || activeTags.size > 0;
  const showingAll = filtered.length === blogPosts.length;

  return (
    <>
      <PageMetadata
        title="Blog Archive"
        description={`All ${blogPosts.length} articles on HAPI MCP — explore by topic, year, or keyword.`}
      />
      <Layout>
        {/* ── Hero ── */}
        <section className="mcpHero mcpArchiveHero">
          <div className="container">
            <span className="mcpSectionBadge">Archive</span>
            <h1 className="mcpHeroTitle">
              Every Article,{' '}
              <strong>One Place</strong>
            </h1>
            <p className="mcpHeroSubtitle">
              {blogPosts.length} articles on MCP, APIs, AI architecture, and the HAPI Stack.
              {' '}Filter by topic, year, or keyword.
            </p>
          </div>
        </section>

        <main>
          {/* ── Filters ── */}
          <div className="mcpSection--alt" style={{ padding: '1.25rem 0 0.75rem' }}>
            <div className="container">
              <div className="mcpArchiveFilters">
                {/* Search */}
                <div className="mcpArchiveSearch">
                  <span className="mcpArchiveSearchIcon" aria-hidden="true">🔍</span>
                  <input
                    type="search"
                    aria-label="Search articles"
                    placeholder="Search articles…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="mcpArchiveSearchInput"
                  />
                </div>

                {/* Year pills */}
                <div className="mcpArchiveYears" role="group" aria-label="Filter by year">
                  <button
                    className={`mcpArchiveYear${activeYear === null ? ' is-active' : ''}`}
                    onClick={() => setActiveYear(null)}
                    aria-pressed={activeYear === null}
                  >
                    All
                  </button>
                  {allYears.map((year) => (
                    <button
                      key={year}
                      className={`mcpArchiveYear${activeYear === year ? ' is-active' : ''}`}
                      onClick={() => setActiveYear(activeYear === year ? null : year)}
                      aria-pressed={activeYear === year}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tag chips */}
              <div className="mcpArchiveTagBar" role="group" aria-label="Filter by topic">
                {allTags.slice(0, 18).map((tag) => (
                  <button
                    key={tag.label}
                    className={`mcpArchiveTagChip${activeTags.has(tag.label) ? ' is-active' : ''}`}
                    onClick={() => toggleTag(tag.label)}
                    aria-pressed={activeTags.has(tag.label)}
                    title={`${tag.count} article${tag.count !== 1 ? 's' : ''}`}
                  >
                    {tag.label}
                    <span className="mcpArchiveTagCount">{tag.count}</span>
                  </button>
                ))}
                {hasFilters && (
                  <button className="mcpArchiveClear" onClick={clearFilters} aria-label="Clear all filters">
                    ✕ Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ── Results ── */}
          <section className="mcpSection">
            <div className="container">
              <div className="mcpArchiveResultsMeta">
                <span>
                  {showingAll
                    ? `${blogPosts.length} article${blogPosts.length !== 1 ? 's' : ''}`
                    : `${filtered.length} of ${blogPosts.length} articles`}
                </span>
                {hasFilters && (
                  <button className="mcpArchiveClearInline" onClick={clearFilters}>
                    Clear filters
                  </button>
                )}
              </div>

              {filtered.length > 0 ? (
                <div className="mcpArchiveGrid">
                  {filtered.map((post) => (
                    <ArchivePostCard key={post.metadata.permalink} post={post} />
                  ))}
                </div>
              ) : (
                <div className="mcpArchiveEmpty">
                  <p>No articles match your filters.</p>
                  <button className="button button--primary" onClick={clearFilters}>
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
}
