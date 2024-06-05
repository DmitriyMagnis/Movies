import { useEffect } from 'react';
import { connect } from 'react-redux';

import { Container, Grid, LinearProgress, Typography } from '@mui/material';
import { useAppDispatch } from '../../hooks';
import { fetchMovies, type Movie } from '../../reducers/movies';
import type { RootState } from '../../store';
import { MovieCard } from './MovieCard';

interface MoviesProps {
  movies: Movie[];
  loading: boolean;
}

function Movies({ movies, loading }: MoviesProps) {
  const dispatch = useAppDispatch();
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
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

const mapStateToProps = (state: RootState) => ({
  movies: state.movies.top,
  loading: state.movies.loading,
});

export default connect(mapStateToProps)(Movies);
