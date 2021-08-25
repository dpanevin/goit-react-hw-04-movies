import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import moviesApi from 'utils/MoviesApi';

export default function HomePage() {
  const [movies, setMovies] = useState(null);

  useEffect(() => fetchTrendingMovies(), []);

  async function fetchTrendingMovies() {
    const response = await moviesApi.fetchTrendingMovies();
    const results = response.results;
    setMovies(results);
  }

  return (
    <section className="section">
      <h1>Trendeng today</h1>
      <ul>
        {movies &&
          movies.map(movie => {
            return (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
              </li>
            );
          })}
      </ul>
    </section>
  );
}
