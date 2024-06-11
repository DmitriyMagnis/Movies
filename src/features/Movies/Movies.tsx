import { useCallback, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Container, Grid, LinearProgress, Typography } from '@mui/material';
import { useIntersectionObserver } from '../../hooks/useIntercectionObserver';
import {
  useGetConfigurationQuery,
  useGetMoviesQuery,
  type MoviesFilters,
  type MoviesQuery,
} from '../../services/tmdb';
import MovieCard from './MovieCard';
import MoviesFilter from './MoviesFilter';

const initialQuery: MoviesQuery = {
  page: 1,
  filters: {},
};

const Movies = () => {
  const [query, setQuery] = useState<MoviesQuery>(initialQuery);

  const { data: configuration } = useGetConfigurationQuery();
  const { data, isFetching } = useGetMoviesQuery(query);

  const movies = data?.results ?? [];
  const hasMorePages = data?.hasMorePages;

  const { user, isAuthenticated } = useAuth0();

  const formatImageUrl = (path?: string) => {
    return path && configuration
      ? `${configuration?.images.base_url}w780${path}`
      : undefined;
  };
  const onIntersect = useCallback(() => {
    if (hasMorePages) {
      setQuery(q => ({ ...q, page: q.page + 1 }));
    }
  }, [hasMorePages]);

  const [targetRef, entry] = useIntersectionObserver({ onIntersect });

  const handleAddToFavorite = useCallback(
    (id: number) => {
      alert(`Not ${(user?.name, id)}`);
    },
    [user?.name]
  );
  return (
    <Grid container spacing={2} sx={{ flexWrap: 'nowrap' }} maxWidth="lg">
      <Grid item xs="auto">
        <MoviesFilter
          onApply={filters => {
            const moviesFilters: MoviesFilters = {
              keywords: filters.keywords.map(k => k.id),
              genres: filters.genres,
            };
            setQuery({
              page: 1,
              filters: moviesFilters,
            });
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Container sx={{ py: 8, pt: 10 }} maxWidth="lg">
          {!isFetching && !movies.length && (
            <Typography variant="h6">No movies were founded!</Typography>
          )}
          <Grid container spacing={4}>
            {movies.map((m, i) => (
              <Grid item key={`${m.id} -${i}`} xs={12} sm={6} md={4}>
                <MovieCard
                  id={m.id}
                  title={m.title}
                  overview={m.overview}
                  popularity={m.popularity}
                  image={formatImageUrl(m.backdrop_path)}
                  enableUserActions={isAuthenticated}
                  onAddFavorite={handleAddToFavorite}
                />
              </Grid>
            ))}
          </Grid>
          <div ref={targetRef}>
            {isFetching && <LinearProgress color="secondary" sx={{ mt: 3 }} />}
          </div>
        </Container>
      </Grid>
    </Grid>
  );
};
export default Movies;
