import React, { useContext } from 'react';

import Hero from '../Hero';
import LatestList from '../LatestList';
import PostList from '../PostList';
import { PostsContext } from '../../store/Posts';
import { sortObjectsArrayByKey } from '../../utils/helpers';

export default () => {
  const { state: posts } = useContext(PostsContext);
  const sortedDescPosts = sortObjectsArrayByKey(posts.data, ['metadata', 'publishedAt'], true);

  return (
    <main>
      <Hero />
      <LatestList data={sortedDescPosts.slice(0, 3)} />
      <PostList data={sortedDescPosts} />
    </main>
  );
};
