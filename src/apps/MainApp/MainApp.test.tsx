import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import DummyComponent from '@/testing/DummyComponent';
import MainApp from '.';

jest.mock('@/pages/MainPage', () => DummyComponent);

describe('[App] MainApp', () => {
  it('should have only one class for content by default', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/']}>
        <MainApp />
      </MemoryRouter>,
    );

    expect(getByTestId('content')).toHaveAttribute('class', 'Content');
  });
});
