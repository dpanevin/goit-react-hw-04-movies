import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import moviesApi from 'utils/MoviesApi';
import styles from 'components/MovieDetails/MovieDetails.module.css';

export default function MovieDetails() {
  const { movieId } = useParams();
  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (info) {
      console.log(info);
      return;
    }

    async function fecthMovieInfo() {
      const response = await moviesApi.fetchMovieById(movieId);
      setInfo(response);
      console.log(info);
    }

    fecthMovieInfo();
  }, [info, movieId]);

  return (
    <>
      {info && (
        <div className={styles.MovieDetails}>
          <img
            className={styles.moviePosterImg}
            src={`https://image.tmdb.org/t/p/w500/${info.poster_path}`}
            alt={info.title}
          />
          <div className={styles.movieInfo}>
            <h2>{info.title}</h2>
            <p>
              Оценка: {info.vote_average} ({info.vote_count})
            </p>
            <h3>Описание</h3>
            <p>{info.overview}</p>
            <h3>Жанры</h3>
            {/* {info.genres.map(genre => genre.name)} */}
          </div>
        </div>
      )}
    </>
  );
}
