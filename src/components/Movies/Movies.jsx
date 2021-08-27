import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link, useHistory, useLocation } from 'react-router-dom';
import moviesApi from 'utils/MoviesApi';
import styles from './Movies.module.css';

export default function Movies() {
  const location = useLocation();
  const history = useHistory();
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(null);
  const request = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (movies || !request) {
      return;
    }

    onSubmit(request);
  }, [movies, request]);

  function onChange(e) {
    setQuery(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (query.trim() === '') {
      toast.error('Введите поисковый запрос.');
      return;
    }
    history.push({
      ...location,
      search: `query=${query}`,
    });

    onSubmit(query);
    setQuery('');
  }

  async function onSubmit(query) {
    const response = await moviesApi.fetchMoviesByQuery(query);

    setMovies(response.results);
  }

  return (
    <>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.SearchFormButton}>
          <span className={styles.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={styles.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Поиск фильмов"
          onChange={onChange}
          value={query}
        />
      </form>

      {movies && (
        <ul>
          {movies.map(movie => {
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
      )}
    </>
  );
}
