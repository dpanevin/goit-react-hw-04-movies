import { useState, useEffect } from 'react';
import styles from './Cast.module.css';
import moviesApi from 'utils/MoviesApi';

export default function Cast({ movieId }) {
  const [cast, setCast] = useState(null);

  useEffect(() => {
    async function fetchMovieCast() {
      const response = await moviesApi.fetchMovieCast(movieId);
      setCast(response);
    }

    fetchMovieCast();
  }, [movieId]);

  return (
    <ul>
      {cast &&
        cast.map(({ cast_id, name, profile_path, character }) => {
          if (!profile_path) {
            return null;
          }

          return (
            <li className={styles.castItem} key={cast_id}>
              <img
                className={styles.castImg}
                src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
                alt={name}
              />
              <span className={styles.castName}>{name}</span>
              <span>Персонаж: {character}</span>
            </li>
          );
        })}
    </ul>
  );
}
