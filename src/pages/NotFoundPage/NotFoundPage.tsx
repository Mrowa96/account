import React from 'react';
import styles from './NotFoundPage.scss';

export default function NotFoundPage(): JSX.Element {
  return (
    <p data-testid='message' className={styles.Message}>
      Sorry, but requested page cannot be found{' '}
      <span role='img' aria-label='Sad face'>
        😟
      </span>
    </p>
  );
}
