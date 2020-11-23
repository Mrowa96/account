import React from 'react';
import { render } from '@testing-library/react';
import Footer from '.';

describe('[App] MainApp [Component] Footer', () => {
  it('should display footer with link to profile page', () => {
    const { getByRole } = render(<Footer />);

    expect(getByRole('contentinfo')).toBeInTheDocument();
    expect(getByRole('link')).toHaveAttribute('href', 'https://pawel-mrowiec.dev/');
    expect(getByRole('link')).toHaveAttribute('target', '_blank');
    expect(getByRole('link')).toHaveAttribute('rel', 'noreferrer noopener');
  });
});
