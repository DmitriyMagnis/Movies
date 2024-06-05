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
}

interface Configuration {
  images: {
    base_url: string;
  };
}

export const client = {
  getConfiguration: async () => {
    return get<Configuration>('/configuration');
  },
  getNowPlaying: async (): Promise<MovieDetails[]> => {
    const response = await get<PageResponse<MovieDetails>>(
      '/movie/now_playing?page=1'
    );
    return response.results;
  },
};
