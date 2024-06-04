import { connect } from 'react-redux';
import type { Movie } from '../../reducers/movies';
import type { RootState } from '../../store';
import { MovieCard } from './MovieCard';

interface MoviesProps {
  movies: Movie[];
}

function Movies({ movies }: MoviesProps) {
  return (
    <div>
      <section>
        <div className="Movies-list">
          {movies.map(m => (
            <MovieCard
              key={m.id}
              id={m.id}
              title={m.title}
              overview={m.overview}
              popularity={m.popularity}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  movies: state.movies.top,
});

export default connect(mapStateToProps)(Movies);
