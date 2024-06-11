import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import { gql } from 'graphql-request';

export interface EpisodesState {
  results: Episode[];
}

export interface EpisodesQuery {
  page: number;
}

interface EpisodesResponse {
  episodes: {
    results: Episode[];
  };
}

export interface Episode {
  name: string;
  air_date: string;
  episode: string;
  characters: Character[];
}

export interface Character {
  id: string;
  name: string;
  image: string;
}

export const rickandmortyApi = createApi({
  reducerPath: 'rickandmoryApi',
  baseQuery: graphqlRequestBaseQuery({
    url: 'https://rickandmortyapi.com/graphql',
  }),
  endpoints: builder => ({
    getEpisodes: builder.query<EpisodesState, EpisodesQuery>({
      transformResponse: (response: EpisodesResponse) => ({
        results: response.episodes.results,
      }),
      query: ({ page }) => ({
        document: gql`
          query GetEpisodesPage($page: Int) {
            episodes(page: $page) {
              results {
                name
                air_date
                episode
                characters {
                  id
                  name
                  image
                }
              }
            }
          }
        `,
        variables: {
          page,
        },
      }),
    }),
  }),
});

export const { useGetEpisodesQuery } = rickandmortyApi;
