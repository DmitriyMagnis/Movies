import type { Action, Reducer } from 'redux';

export interface Movie {
  id: number;
  title: string;
  popularity: number;
  overview: string;
}

interface MovieState {
  top: Movie[];
}

const initialState: MovieState = {
  top: [
    { id: 1, title: 'inception', popularity: 98, overview: 'Dreams...' },
    { id: 2, title: 'inception2', popularity: 12, overview: 'Dreams2...' },
    { id: 3, title: 'inception3', popularity: 9312, overview: 'Dreams3...' },
  ],
};

const moviesReducer: Reducer<MovieState, Action> = (state, action) => {
  return initialState;
};
export default moviesReducer;
