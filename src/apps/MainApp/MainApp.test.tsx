import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import MainApp from '.';

describe('[App] MainApp', () => {
  it('should display content', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/404']}>
        <MainApp />
      </MemoryRouter>,
    );

    expect(getByTestId('content')).toHaveAttribute('class', 'Content');
  });
});
