import React from 'react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router';
import { render, fireEvent, waitFor } from '@testing-library/react';
import StoredAccountData from '@/modules/StoredAccountData';
import callApi from '@/helpers/callApi';
import LoginPage from '.';

jest.mock('@/modules/StoredAccountData', () => ({
  has: jest.fn(),
  store: jest.fn(),
}));

jest.mock('@/helpers/callApi');

describe('[Page] LoginPage', () => {
  let history: MemoryHistory;
  let component;

  beforeEach(() => {
    (StoredAccountData.has as jest.Mock).mockReturnValue(false);
    (StoredAccountData.store as jest.Mock).mockClear();
    (callApi as jest.Mock).mockClear();

    history = createMemoryHistory({
      initialEntries: ['/login'],
    });
    component = (
      <Router history={history}>
        <LoginPage />
      </Router>
    );
  });

  it('should have correct heading', () => {
    const { getByRole } = render(component);

    expect(getByRole('heading')).toHaveTextContent('Login');
  });

  it('should render form with required email and password fields', () => {
    const { getByRole, getByLabelText } = render(component);

    expect(getByRole('form')).toBeInTheDocument();
    expect(getByLabelText('Email')).toBeRequired();
    expect(getByLabelText('Email')).toHaveAttribute('type', 'email');
    expect(getByLabelText('Password')).toBeRequired();
    expect(getByLabelText('Password')).toHaveAttribute('type', 'password');
  });

  it('should render submit button in the form', () => {
    const { getByRole } = render(component);

    expect(getByRole('button')).toHaveTextContent('Login');
    expect(getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('should redirect to dashboard if account data is stored', () => {
    (StoredAccountData.has as jest.Mock).mockReturnValue(true);

    expect(history.location.pathname).toEqual('/login');

    const { container } = render(component);

    expect(history.location.pathname).toEqual('/');
    expect(container).toBeEmptyDOMElement();
  });

  test.each(['aaaaaaaa', '12345678', 'aB3cdef', 'abcd1234'])('should mark password field as invalid', password => {
    const { getByLabelText } = render(component);

    fireEvent.change(getByLabelText('Password'), { target: { value: password } });

    expect(getByLabelText('Password')).toBeInvalid();
  });

  test.each(['abcdEf1@', '1234ABCD'])('should mark password field as valid', password => {
    const { getByLabelText } = render(component);

    fireEvent.change(getByLabelText('Password'), { target: { value: password } });

    expect(getByLabelText('Password')).toBeValid();
  });

  it('should redirect to dashboard login was successful', () => {
    (callApi as jest.Mock).mockResolvedValue({
      status: 204,
    });

    const { getByLabelText, getByRole } = render(component);

    fireEvent.change(getByLabelText('Email'), {
      target: {
        value: 'test@example.com',
      },
    });
    fireEvent.change(getByLabelText('Password'), {
      target: {
        value: 'password',
      },
    });

    expect(history.location.pathname).toEqual('/login');

    fireEvent.click(getByRole('button'));

    waitFor(() => {
      expect(history.location.pathname).toEqual('/');
      expect(StoredAccountData.store).toHaveBeenCalledTimes(1);
      expect(StoredAccountData.store).toHaveBeenCalledWith('test@example.com');
    });
  });
});
