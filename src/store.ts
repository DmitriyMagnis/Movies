import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, createStore, type UnknownAction } from 'redux';
import { ThunkAction, thunk } from 'redux-thunk';
import rootReducers from './reducers/index';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(rootReducers, composedEnhancer);

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType> = ThunkAction<
  ReturnType,
  RootState,
  undefined,
  UnknownAction
>;

export type RootState = ReturnType<typeof store.getState>;

export default store;
