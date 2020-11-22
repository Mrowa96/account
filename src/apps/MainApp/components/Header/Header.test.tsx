import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Header from '.';

describe('[App] MainApp [Component] Header', () => {
  let component;

  beforeEach(() => {
    component = (
      <MemoryRouter initialEntries={['/404']}>
        <Header />
      </MemoryRouter>
    );
  });

  it('should display header with linking logo', () => {
    const { getByRole } = render(component);

    expect(getByRole('banner')).toBeInTheDocument();
    expect(getByRole('link')).toHaveAttribute('href', '/');
    expect(getByRole('heading')).toHaveTextContent('Account');
  });
});
