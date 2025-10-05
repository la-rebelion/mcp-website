import React, {type ReactNode} from 'react';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import BlogPostItemHeaderTitle from '@theme/BlogPostItem/Header/Title';
import BlogPostItemHeaderInfo from '@theme/BlogPostItem/Header/Info';
import BlogPostItemHeaderAuthors from '@theme/BlogPostItem/Header/Authors';

export default function BlogPostItemHeader(): ReactNode {
  const {isBlogPostPage, frontMatter} = useBlogPost();
  const hero = (frontMatter as any).hero || (frontMatter as any).image;
  return (
    <header>
      {isBlogPostPage && hero && (
        <div className="mcpPostHero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={hero} alt="" loading="eager" />
        </div>
      )}
      <BlogPostItemHeaderTitle />
      <BlogPostItemHeaderInfo />
      <BlogPostItemHeaderAuthors />
    </header>
  );
}

