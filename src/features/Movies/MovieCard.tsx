import { Link } from 'react-router-dom';
import './Movies.css';

interface MovieCardProps {
  title: string;
  overview: string;
  popularity: number;
  id: number;
}

function MovieCard({ id, title, popularity, overview }: MovieCardProps) {
  return (
    <div className="Movies-card">
      <Link to={`/movies/${id}`}>{title}</Link>
      <div className="Movies-popularity">{popularity}</div>
      <div className="Movies-overview">{overview}</div>
    </div>
  );
}
export { MovieCard };
