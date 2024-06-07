import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { type UnknownAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { rickandmortyApi } from './services/rickandmorty';
import { tmdbApi } from './services/tmdb';

const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    [rickandmortyApi.reducerPath]: rickandmortyApi.reducer,
  },
  middleware: getDeaultMiddleware =>
    getDeaultMiddleware().concat(
      tmdbApi.middleware,
      rickandmortyApi.middleware
    ),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType> = ThunkAction<
  ReturnType,
  RootState,
  undefined,
  UnknownAction
>;

export type RootState = ReturnType<typeof store.getState>;

export default store;
