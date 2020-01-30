import React from 'react';

import Latest from '../Latest';

const getKey = (post) => {
  const { authorId, publishedAt } = post.metadata;
  return `latest-${authorId}-${publishedAt}`;
};

export default ({ data }) =>
  data.length > 0 && (
    <section>
      <header>
        <h1>Latest Posts</h1>
      </header>
      <ul className="latest">
        {data.map((post) => (
          <Latest key={getKey(post)} data={post} />
        ))}
      </ul>
    </section>
  );
