import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import {useDateTimeFormat} from '@docusaurus/theme-common/internal';
import BlogPostItemContainer from '@theme/BlogPostItem/Container';
import BlogPostItemHeader from '@theme/BlogPostItem/Header';
import BlogPostItemContent from '@theme/BlogPostItem/Content';
import BlogPostItemFooter from '@theme/BlogPostItem/Footer';
import type {Props} from '@theme/BlogPostItem';

function ShareIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden focusable="false" {...props}>
      <path fill="currentColor" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7a3.27 3.27 0 0 0 0-1.39l7.02-4.11A2.99 2.99 0 1 0 14 5a3 3 0 0 0 .05.55L7.03 9.66a3 3 0 1 0 0 4.69l7.02 4.11c-.03.17-.05.34-.05.52a3 3 0 1 0 3-3z"/>
    </svg>
  );
}

export default function BlogPostItem({children, className}: Props): ReactNode {
  const {metadata, frontMatter, isBlogPostPage} = useBlogPost();
  const {title, date, permalink, authors} = metadata;
  const hero = (frontMatter as any).hero || (frontMatter as any).image;
  const dateTimeFormat = useDateTimeFormat({day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'});
  const formattedDate = dateTimeFormat.format(new Date(date));

  if (isBlogPostPage) {
    return (
      <BlogPostItemContainer className={className}>
        <div className="card__body">
          <BlogPostItemHeader />
          <BlogPostItemContent>{children}</BlogPostItemContent>
          <BlogPostItemFooter />
        </div>
      </BlogPostItemContainer>
    );
  }

  const fallbackImg = '/img/logo.png';
  const imgSrc = hero || fallbackImg;

  const onShare = async () => {
    const url = (typeof window !== 'undefined' ? window.location.origin : '') + permalink;
    try {
      // Prefer native share when available
      // @ts-ignore
      if (navigator.share) {
        // @ts-ignore
        await navigator.share({title, url});
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      }
    } catch {}
  };

  const avatarLetter = (authors?.[0]?.name || title || 'M').trim().charAt(0).toUpperCase();

  return (
    <BlogPostItemContainer className={clsx('mcpPostCard', className)}>
      <div className="card__body">
        <div className="mcpPostCardHeader">
          <div className="mcpPostHeaderLeft">
            <div className="mcpAvatar" aria-hidden>{avatarLetter}</div>
            <div>
              <h3 className="mcpPostTitle"><Link to={permalink}>{title}</Link></h3>
              {/* <div className="mcpPostMeta">{formattedDate}</div> */}
            </div>
          </div>
          <button className="mcpShareBtn" type="button" aria-label="Share" onClick={onShare}>
            <ShareIcon />
          </button>
        </div>
      <div className="card__image mcpCardImage">
        <Link to={permalink}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imgSrc} alt="" loading="lazy" />
        </Link>
      </div>
      </div>
      <div className="card__body">
        <div className="mcpExcerpt">
          <BlogPostItemContent>{children}</BlogPostItemContent>
        </div>
        <BlogPostItemFooter />
      </div>
    </BlogPostItemContainer>
  );
}
