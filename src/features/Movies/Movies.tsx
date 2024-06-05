import { useContext, useEffect } from 'react';

import { Container, Grid, LinearProgress, Typography } from '@mui/material';
import { AuthContext } from '../../AuthContext';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchMovies } from '../../reducers/movies';
import { MovieCard } from './MovieCard';

const Movies = () => {
  const movies = useAppSelector(state => state.movies.top);
  const loading = useAppSelector(state => state.movies.loading);
  const dispatch = useAppDispatch();
  const { user } = useContext(AuthContext);

  const loggedIn = user.name !== 'anonimous';

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);
  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Typography variant="h4" align="center" paddingTop="10px">
        Now Playing
      </Typography>
      {loading ? (
        <LinearProgress color="secondary" />
      ) : (
        <Grid container spacing={4}>
          {movies.map(m => (
            <Grid item key={m.id} xs={12} sm={6} md={4}>
              <MovieCard
                id={m.id}
                title={m.title}
                overview={m.overview}
                popularity={m.popularity}
                image={m.image}
                enableUserActions={loggedIn}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};
export default Movies;
