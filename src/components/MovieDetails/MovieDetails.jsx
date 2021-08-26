import { useState, lazy, Suspense } from 'react';
import {
  NavLink,
  Switch,
  Route,
  useParams,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import Loader from 'react-loader-spinner';
import moviesApi from 'utils/MoviesApi';
import styles from 'components/MovieDetails/MovieDetails.module.css';
// import Cast from './Cast/Cast';
// import Reviews from './Reviews/Reviews';

const Cast = lazy(() =>
  import('components/MovieDetails/Cast/Cast' /* webpackChunkName: 'Cast' */),
);
const Reviews = lazy(() =>
  import(
    'components/MovieDetails/Reviews/Reviews' /* webpackChunkName: 'Reviews' */
  ),
);

export default function MovieDetails() {
  const history = useHistory();
  const location = useLocation();
  const { movieId } = useParams();
  const { url } = useRouteMatch();
  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (info) {
      return;
    }

    async function fecthMovieInfo() {
      const response = await moviesApi.fetchMovieById(movieId);
      setInfo(response);
    }

    fecthMovieInfo();
  }, [info, movieId]);

  function onGoBack() {
    history.push(location?.state?.from ?? '/');
  }

  return (
    <>
      {info && (
        <>
          <button className={styles.goBackBtn} type="button" onClick={onGoBack}>
            Назад
          </button>
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
              {info.genres.map(genre => genre.name).join(', ')}
            </div>
          </div>
          <div>
            <p>Дополнительно:</p>
            <ul>
              <li>
                <NavLink
                  to={`${url}/cast`}
                  className={styles.addInfoLink}
                  activeClassName={styles.activeInfoLink}
                >
                  Актеры
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`${url}/reviews`}
                  className={styles.addInfoLink}
                  activeClassName={styles.activeInfoLink}
                >
                  Ревизии (English)
                </NavLink>
              </li>
            </ul>

            <Suspense
              fallback={
                <Loader
                  className="Loader"
                  type="Oval"
                  color="rgb(0, 224, 217)"
                  height={100}
                  width={100}
                />
              }
            >
              <Switch>
                <Route path={`${url}/cast`}>
                  <Cast movieId={movieId} />
                </Route>
                <Route path={`${url}/reviews`}>
                  <Reviews movieId={movieId} />
                </Route>
              </Switch>
            </Suspense>
          </div>
        </>
      )}
    </>
  );
}
