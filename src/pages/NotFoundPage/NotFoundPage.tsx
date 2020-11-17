import React from 'react';

export default function NotFoundPage(): JSX.Element {
  return (
    <>
      <h2>Page not found</h2>
      <p data-testid='message'>
        Sorry, but requested page cannot be found{' '}
        <span role='img' aria-label='Sad face'>
          😟
        </span>
        .
      </p>
    </>
  );
}
