import React, {type ReactNode} from 'react';
import type {Props} from '@theme/BlogPostItem/Container';
import clsx from 'clsx';

export default function BlogPostItemContainer({
  children,
  className,
}: Props): ReactNode {
  return (
    <article className={clsx('card shadow--sm', className)}>
      <div className="card__body">{children}</div>
    </article>
  );
}

