import React from 'react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router';
import { render, fireEvent } from '@testing-library/react';
import StoredAccountData from '@/modules/StoredAccountData';
import DashboardPage from '.';

jest.mock('@/modules/StoredAccountData', () => ({
  get: jest.fn(),
  clear: jest.fn(),
}));

describe('[Page] DashboardPage', () => {
  let history: MemoryHistory;
  let component;

  beforeEach(() => {
    (StoredAccountData.get as jest.Mock).mockReturnValue({ email: 'test@example.com' });
    (StoredAccountData.clear as jest.Mock).mockClear();

    history = createMemoryHistory({
      initialEntries: ['/'],
    });
    component = (
      <Router history={history}>
        <DashboardPage />
      </Router>
    );
  });

  it('should have heading, button and email', () => {
    const { getByRole, getByText } = render(component);

    expect(getByRole('heading')).toHaveTextContent('Dashboard');
    expect(getByText('test@example.com')).toBeInTheDocument();
    expect(getByRole('button')).toBeInTheDocument();
    expect(getByRole('button')).toHaveTextContent('Logout');
  });

  it('should redirect to login page if stored account data is empty', () => {
    (StoredAccountData.get as jest.Mock).mockReturnValue(undefined);

    expect(history.location.pathname).toEqual('/');

    const { container } = render(component);

    expect(history.location.pathname).toEqual('/login');
    expect(container).toBeEmptyDOMElement();
  });

  it('should redirect to login page and clear stored data after click on logout button', () => {
    expect(history.location.pathname).toEqual('/');

    const { getByRole } = render(component);

    fireEvent.click(getByRole('button'));

    expect(history.location.pathname).toEqual('/login');
    expect(StoredAccountData.clear).toHaveBeenCalledTimes(1);
  });
});
