import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import DummyComponent from '@/testing/DummyComponent';
import MainApp from '.';

jest.mock('@/pages/MainPage', () => DummyComponent);

describe('[App] MainApp', () => {
  it('should display content', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/']}>
        <MainApp />
      </MemoryRouter>,
    );

    expect(getByTestId('content')).toHaveAttribute('class', 'Content');
  });
});
