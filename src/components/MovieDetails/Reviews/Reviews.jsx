import { useState, useEffect } from 'react';
import styles from './Reviews.module.css';
import moviesApi from 'utils/MoviesApi';

export default function Reviews({ movieId }) {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    async function fetchMovieReviews() {
      const response = await moviesApi.fetchMovieReviews(movieId);

      if (response.length !== 0) {
        setReviews(response);
      } else {
        setReviews([
          {
            author: 'Отсутсвует :(',
            content:
              'К этому фильму еще никто не написал ревизию, когда ситуация измениться, этот раздел обновится автоматически.',
            id: 1,
          },
        ]);
      }
    }

    fetchMovieReviews();
  }, [movieId]);

  return (
    <ul>
      {reviews &&
        reviews.map(({ author, content, id }) => {
          return (
            <li className={styles.reviewItem} key={id}>
              <span className={styles.reviewAuthor}>Автор: {author}</span>
              <p>{content}</p>
            </li>
          );
        })}
    </ul>
  );
}
