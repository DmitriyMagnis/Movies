import configuration from '../configuration';

const get = async <TBody>(relativeUrl: string): Promise<TBody> => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${configuration.token}`,
    },
  };
  const response = await fetch(
    `${configuration.apiUrl}/3${relativeUrl}`,
    options
  );
  const data: TBody = await response.json();

  return data;
};

export interface MovieDetails {
  id: number;
  title: string;
  popularity: number;
  overview: string;
  backdrop_path?: string;
}
interface PageResponse<TResult> {
  results: TResult[];
  page: number;
  total_pages: number;
}
interface PageDetails<TResult> {
  results: TResult[];
  page: number;
  totalPages: number;
}
interface Configuration {
  images: {
    base_url: string;
  };
}

export interface MoviesFilters {
  keywords?: number[];
  genres?: number[];
}
export interface KeywordItem {
  id: number;
  name: string;
}

export const client = {
  getConfiguration: async () => {
    return get<Configuration>('/configuration');
  },
  getNowPlaying: async (
    page: number = 1
  ): Promise<PageDetails<MovieDetails>> => {
    const response = await get<PageResponse<MovieDetails>>(
      `/movie/now_playing?page=${page}`
    );
    return {
      results: response.results,
      page: response.page,
      totalPages: response.total_pages,
    };
  },
  getMovies: async (page: number = 1, filters: MoviesFilters) => {
    const params = new URLSearchParams({
      page: page.toString(),
    });
    console.log(filters);
    if (filters.keywords?.length) {
      params.append('with_keywords', filters.keywords.join('|'));
    }
    if (filters.genres?.length) {
      params.append('with_genres', filters.genres.join(','));
    }
    const query = params.toString();
    const response = await get<PageResponse<MovieDetails>>(
      `/discover/movie?${query}`
    );
    return {
      results: response.results,
      page: response.page,
      totalPages: response.total_pages,
    };
  },
  geKeywords: async (query: string): Promise<KeywordItem[]> => {
    const response = await get<PageResponse<KeywordItem>>(
      `/search/keyword?query=${query}`
    );
    return response.results;
  },
};
