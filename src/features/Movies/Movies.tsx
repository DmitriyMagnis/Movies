import { useCallback, useContext, useEffect, useState } from 'react';

import { Container, Grid, LinearProgress, Typography } from '@mui/material';
import { AuthContext } from '../../AuthContext';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useIntersectionObserver } from '../../hooks/useIntercectionObserver';
import MovieCard from './MovieCard';
import type { Filters } from './MoviesFilter';
import MoviesFilter from './MoviesFilter';
import { fetchNextPage, resetMovies } from './moviesSlice';

const Movies = () => {
  const [filters, setFilters] = useState<Filters>();
  const movies = useAppSelector(state => state.movies.top);
  const loading = useAppSelector(state => state.movies.loading);
  const hasMorePages = useAppSelector(state => state.movies.hasMorePages);
  const dispatch = useAppDispatch();
  const { user } = useContext(AuthContext);

  const loggedIn = user.name !== 'anonimous';

  const [targetRef, entry] = useIntersectionObserver();

  useEffect(() => {
    dispatch(resetMovies());
  }, [dispatch]);

  useEffect(() => {
    if (entry?.isIntersecting && hasMorePages) {
      const movieFIlters = filters
        ? {
            keywords: filters.keywords.map(k => k.id),
            genres: filters.genres,
          }
        : undefined;
      dispatch(fetchNextPage(movieFIlters));
    }
  }, [dispatch, entry?.isIntersecting, filters, hasMorePages]);

  const handleAddToFavorite = useCallback(
    (id: number) => {
      alert(`Not ${(user.name, id)}`);
    },
    [user.name]
  );
  return (
    <Grid container spacing={2} sx={{ flexWrap: 'nowrap' }} maxWidth="lg">
      <Grid item xs="auto">
        <MoviesFilter
          onApply={f => {
            dispatch(resetMovies());
            setFilters(f);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Container sx={{ py: 8, pt: 10 }} maxWidth="lg">
          {!loading && !movies.length && (
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
                  image={m.image}
                  enableUserActions={loggedIn}
                  onAddFavorite={handleAddToFavorite}
                />
              </Grid>
            ))}
          </Grid>
          <div ref={targetRef}>
            {loading && <LinearProgress color="secondary" sx={{ mt: 3 }} />}
          </div>
        </Container>
      </Grid>
    </Grid>
  );
};
export default Movies;
