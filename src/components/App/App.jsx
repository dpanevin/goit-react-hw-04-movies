import HomePage from 'components/HomePage/HomePage';
import MovieDetails from 'components/MovieDetails/MovieDetails';
import Nav from 'components/Nav/Nav';
import { Route, Switch } from 'react-router-dom';

export default function App() {
  return (
    <>
      <Nav />

      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/movies/:movieId">
          <MovieDetails />
        </Route>

        <Route path="/movies">Movies</Route>
      </Switch>
    </>
  );
}
