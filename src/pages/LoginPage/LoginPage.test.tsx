import React from 'react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router';
import { render } from '@testing-library/react';
import StoredAccountData from '@/modules/StoredAccountData';
import LoginPage from '.';

jest.mock('@/modules/StoredAccountData', () => ({
  get: jest.fn(),
  store: jest.fn(),
}));
jest.mock('@/helpers/callApi');

describe('[Page] LoginPage', () => {
  let history: MemoryHistory;
  let component;

  beforeEach(() => {
    (StoredAccountData.get as jest.Mock).mockReturnValue(undefined);
    (StoredAccountData.store as jest.Mock).mockClear();

    history = createMemoryHistory({
      initialEntries: ['/login'],
    });
    component = (
      <Router history={history}>
        <LoginPage />
      </Router>
    );
  });

  it('should have correct heading and form', () => {
    const { getByRole } = render(component);

    expect(getByRole('heading')).toHaveTextContent('Login');
    expect(getByRole('form')).toBeInTheDocument();
  });

  it('should redirect to dashboard if account data is stored', () => {
    (StoredAccountData.get as jest.Mock).mockReturnValue({ email: 'test@example.com' });

    expect(history.location.pathname).toEqual('/login');

    const { container } = render(component);

    expect(history.location.pathname).toEqual('/');
    expect(container).toBeEmptyDOMElement();
  });
});
