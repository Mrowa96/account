import React from 'react';

export default function NotFoundPage(): JSX.Element {
  return (
    <p data-testid='message'>
      Sorry, but requested page cannot be found{' '}
      <span role='img' aria-label='Sad face'>
        😟
      </span>
      .
    </p>
  );
}
