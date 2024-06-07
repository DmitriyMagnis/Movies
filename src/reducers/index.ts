import { combineReducers } from 'redux';
import moviesReducer from '../features/Movies/moviesSlice';

export default combineReducers({
  movies: moviesReducer,
});
