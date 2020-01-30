import React, { createContext, useState, useEffect } from 'react';

import { getAuthors } from '../../services/api';
import { getStorageObject, setStorageObject, areEqualObjects } from '../../utils/helpers';

const STORAGE_ID = 'the-simple-post-authors';

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

export const AuthorsContext = createContext();
export const AuthorsProvider = ({ children }) => {
  const [state, setState] = useState(getLocalStorageState);
  const updateState = (payload) => setState((state) => ({ ...state, ...payload }));
  const providerValue = { state, setState: updateState };

  useEffect(() => {
    areEqualObjects(state, INITIAL_STATE) &&
      (async () => {
        try {
          updateState({ loaded: false });
          const { data } = await getAuthors();
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

  return <AuthorsContext.Provider value={providerValue}>{children}</AuthorsContext.Provider>;
};

export default {
  AuthorsContext,
  AuthorsProvider,
};
