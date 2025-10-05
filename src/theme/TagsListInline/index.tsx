import React from 'react';
import Tag from '@theme/Tag';
import type {Props} from '@theme/TagsListInline';

export default function TagsListInline({tags}: Props) {
  return (
    <ul className="mcpTags padding--none">
      {tags.map((tag) => (
        <li key={tag.permalink} className="mcpTagItem">
          <Tag {...tag} />
        </li>
      ))}
    </ul>
  );
}

