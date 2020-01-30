import React, { createContext, useState, useEffect } from 'react';

import { getPosts } from '../../services/api';
import { getStorageObject, setStorageObject, areEqualObjects } from '../../utils/helpers';

const STORAGE_ID = 'the-simple-post-posts';

const INITIAL_STATE = {
  data: [],
  loaded: true,
  error: false,
};

const getLocalStorageState = () => {
  const lsState = getStorageObject(STORAGE_ID);
  return lsState ? lsState : INITIAL_STATE;
};

const setLocalStorageState = (state) => setStorageObject(STORAGE_ID, state);

export const PostsContext = createContext();
export const PostsProvider = ({ children }) => {
  const [state, setState] = useState(getLocalStorageState);
  const updateState = (payload) => setState((state) => ({ ...state, ...payload }));
  const providerValue = { state, setState: updateState };

  useEffect(() => {
    areEqualObjects(state, INITIAL_STATE) &&
      (async () => {
        try {
          updateState({ loaded: false });
          const { data } = await getPosts();
          updateState({ data });
        } catch (error) {
          console.error(error);
          updateState({ error: true });
        } finally {
          updateState({ loaded: true });
        }
      })();
  }, []); //eslint-disable-line

  useEffect(() => {
    setLocalStorageState(state);
  }, [state]);

  return <PostsContext.Provider value={providerValue}>{children}</PostsContext.Provider>;
};

export default {
  PostsContext,
  PostsProvider,
};
