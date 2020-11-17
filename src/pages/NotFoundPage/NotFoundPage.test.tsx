import React from 'react';
import { render } from '@testing-library/react';
import NotFoundPage from '.';

describe('[Page] NotFoundPage', () => {
  it('should have right heading', () => {
    const { getByRole } = render(<NotFoundPage />);

    expect(getByRole('heading')).toHaveTextContent('Page not found');
  });

  it('should display message', () => {
    const { getByTestId } = render(<NotFoundPage />);

    expect(getByTestId('message')).toHaveTextContent('Sorry, but requested page cannot be found 😟.');
  });
});
