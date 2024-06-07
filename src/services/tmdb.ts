import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import configuration from '../configuration';

export interface MovieDetails {
  id: number;
  title: string;
  popularity: number;
  overview: string;
  backdrop_path?: string;
}

interface Configuration {
  images: {
    base_url: string;
  };
}

export interface Genre {
  id: number;
  name: string;
}

export interface MoviesFilters {
  keywords?: number[];
  genres?: number[];
}

interface PageResponse<TResult> {
  results: TResult[];
  page: number;
  total_pages: number;
}

export interface KeywordItem {
  id: number;
  name: string;
}

export interface MoviesQuery {
  page: number;
  filters: MoviesFilters;
}

interface MoviesState {
  results: MovieDetails[];
  lastPage: number;
  hasMorePages: boolean;
}

export const tmdbApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${configuration.apiUrl}/3`,
    prepareHeaders(headers) {
      headers.set('accept', 'application/json');
      headers.set('Authorization', `Bearer ${configuration.token}`);
    },
  }),
  tagTypes: ['Movies'],
  endpoints: builder => ({
    getConfiguration: builder.query<Configuration, void>({
      query: () => '/configuration',
    }),
    getMovies: builder.query<MoviesState, MoviesQuery>({
      query: movieQuery => {
        const params = new URLSearchParams({
          page: movieQuery.page.toString(),
        });
        if (movieQuery.filters.keywords?.length) {
          params.append('with_keywords', movieQuery.filters.keywords.join('|'));
        }
        if (movieQuery.filters.genres?.length) {
          params.append('with_genres', movieQuery.filters.genres.join(','));
        }
        const query = params.toString();
        const path = `/discover/movie?${query}`;
        return path;
      },
      transformResponse: (response: PageResponse<MovieDetails>, _, arg) => ({
        results: response.results,
        lastPage: response.page,
        hasMorePages: arg.page < response.total_pages,
      }),
      merge: (currentCacheData, responseData) => {
        if (responseData.lastPage === 1) {
          currentCacheData.results = responseData.results;
        } else {
          currentCacheData.results.push(...responseData.results);
        }
        currentCacheData.lastPage = responseData.lastPage;
        currentCacheData.hasMorePages = responseData.hasMorePages;
      },
      serializeQueryArgs: ({ endpointName }) => endpointName,
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
    }),
    getKeywords: builder.query<KeywordItem[], string>({
      query: query => `/search/keyword?query=${query}`,
      transformResponse: (response: PageResponse<KeywordItem>) =>
        response.results,
    }),
    getGenres: builder.query<Genre[], void>({
      query: () => '/genre/movie/list',
      transformResponse: (response: { genres: Genre[] }) => response.genres,
    }),
  }),
});

export const {
  useGetConfigurationQuery,
  useGetGenresQuery,
  useGetKeywordsQuery,
  useGetMoviesQuery,
} = tmdbApi;
