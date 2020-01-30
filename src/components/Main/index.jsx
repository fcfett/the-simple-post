import React, { useContext } from 'react';

import LatestList from '../LatestList';
import PostList from '../PostList';
import { PostsContext } from '../../store/Posts';
import { sortObjectsArrayByKey } from '../../utils/helpers';

export default () => {
  const { state: posts } = useContext(PostsContext);
  const sortedDescPosts = sortObjectsArrayByKey(posts.data, ['metadata', 'publishedAt'], true);

  return (
    <main>
      <LatestList data={sortedDescPosts.slice(0, 3)} />
      <PostList data={sortedDescPosts} />
    </main>
  );
};
