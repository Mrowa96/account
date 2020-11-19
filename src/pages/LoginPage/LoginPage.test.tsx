import React from 'react';
import { render } from '@testing-library/react';
import LoginPage from '.';

describe('[Page] LoginPage', () => {
  it('should have correct heading', () => {
    const { getByRole } = render(<LoginPage />);

    expect(getByRole('heading')).toHaveTextContent('Login');
  });

  it('should render form with required email and password fields', () => {
    const { getByRole, getByLabelText } = render(<LoginPage />);

    expect(getByRole('form')).toBeInTheDocument();
    expect(getByLabelText('Email')).toBeRequired();
    expect(getByLabelText('Password')).toBeRequired();
  });

  it('should render submit button in the form', () => {
    const { getByRole } = render(<LoginPage />);

    expect(getByRole('button')).toHaveTextContent('Login');
    expect(getByRole('button')).toHaveAttribute('type', 'submit');
  });
});
