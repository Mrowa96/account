import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '.';

describe('[Component] Button', () => {
  let component;
  let onClick;

  beforeEach(() => {
    onClick = jest.fn();
    component = <Button onClick={onClick}>Test label</Button>;
  });

  it('should render button with text label', () => {
    const { getByRole } = render(component);

    expect(getByRole('button')).toHaveTextContent('Test label');
  });

  it('should trigger onClick method', () => {
    const { getByRole } = render(component);

    fireEvent.click(getByRole('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should have button type', () => {
    const { getByRole } = render(component);

    expect(getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('should render button with icon and wrapped text', () => {
    const { getByTestId } = render(
      <Button onClick={onClick} icon='some-icon'>
        Test label
      </Button>,
    );

    expect(getByTestId('icon')).toBeInTheDocument();
    expect(getByTestId('text')).toHaveTextContent('Test label');
  });
});
