import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Link from '.';

describe('[Component] Link', () => {
  it('should render link', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Link to='/'>Some link</Link>
      </MemoryRouter>,
    );

    expect(getByRole('link')).toHaveTextContent('Some link');
    expect(getByRole('link')).toHaveAttribute('href', '/');
    expect(getByRole('link')?.tagName).toEqual('A');
  });
});
