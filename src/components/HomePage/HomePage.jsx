import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import moviesApi from 'utils/MoviesApi';
import styles from 'components/HomePage/HomePage.module.css';

export default function HomePage() {
  const location = useLocation();
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
                <Link
                  className={styles.movieLink}
                  to={{
                    pathname: `/movies/${movie.id}`,
                    state: { from: location },
                  }}
                >
                  {movie.title}
                </Link>
              </li>
            );
          })}
      </ul>
    </section>
  );
}
