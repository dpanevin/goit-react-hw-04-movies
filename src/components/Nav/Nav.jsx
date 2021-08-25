import styles from './Nav.module.css';
import { NavLink } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className={styles.navigation}>
      <NavLink
        className={styles.navigationLink}
        activeClassName={styles.navigationActiveLink}
        to="/"
        exact
      >
        Home
      </NavLink>

      <NavLink
        className={styles.navigationLink}
        activeClassName={styles.navigationActiveLink}
        to="/movies"
      >
        Movies
      </NavLink>
    </nav>
  );
}
