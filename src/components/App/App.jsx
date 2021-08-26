import { Redirect, Route, Switch } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { lazy, Suspense } from 'react';
import Loader from 'react-loader-spinner';
import Nav from 'components/Nav/Nav';
// import HomePage from 'components/HomePage/HomePage';
// import Movies from 'components/Movies/Movies';
// import MovieDetails from 'components/MovieDetails/MovieDetails';

const HomePage = lazy(() =>
  import('components/HomePage/HomePage' /* webpackChunkName: 'HomePage' */),
);
const Movies = lazy(() =>
  import('components/Movies/Movies' /* webpackChunkName: 'Movies' */),
);
const MovieDetails = lazy(() =>
  import(
    'components/MovieDetails/MovieDetails' /* webpackChunkName: 'MovieDetails' */
  ),
);

export default function App() {
  return (
    <>
      <Nav />

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
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetails />
          </Route>

          <Route path="/movies">
            <Movies />
          </Route>

          <Redirect to="/" />
        </Switch>
      </Suspense>

      <Toaster />
    </>
  );
}
