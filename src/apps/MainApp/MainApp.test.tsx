import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import MainApp from '.';

describe('[App] MainApp', () => {
  let component;

  beforeEach(() => {
    component = (
      <MemoryRouter initialEntries={['/404']}>
        <MainApp />
      </MemoryRouter>
    );
  });

  it('should display header, content and footer', () => {
    const { getByRole } = render(component);

    expect(getByRole('banner')).toBeInTheDocument();
    expect(getByRole('main')).toBeInTheDocument();
    expect(getByRole('contentinfo')).toBeInTheDocument();
  });
});
