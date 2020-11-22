import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Footer from '.';

describe('[App] MainApp [Component] Footer', () => {
  let component;

  beforeEach(() => {
    component = (
      <MemoryRouter initialEntries={['/404']}>
        <Footer />
      </MemoryRouter>
    );
  });

  it('should display footer with link to profile page', () => {
    const { getByRole } = render(component);

    expect(getByRole('contentinfo')).toBeInTheDocument();
    expect(getByRole('link')).toHaveAttribute('href', 'https://pawel-mrowiec.dev/');
    expect(getByRole('link')).toHaveAttribute('target', '_blank');
    expect(getByRole('link')).toHaveAttribute('rel', 'noreferrer noopener');
  });
});
