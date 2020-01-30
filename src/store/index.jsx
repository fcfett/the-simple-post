import React from 'react';
import { AuthorsProvider } from './Authors';
import { PostsProvider } from './Posts';

export default ({ children }) => (
  <AuthorsProvider>
    <PostsProvider>{children}</PostsProvider>
  </AuthorsProvider>
);
