import React from 'react';
import { render } from '@testing-library/react';
import Label from '.';

describe('[Component] Label', () => {
  it('should render label with children', () => {
    const { getByTestId } = render(<Label>Label</Label>);

    expect(getByTestId('label')?.tagName).toEqual('LABEL');
    expect(getByTestId('label')).toHaveTextContent('Label');
  });

  it('should proxy all properties passed to component', () => {
    const { getByTestId } = render(
      <Label aria-label='test' data-whatever='on'>
        Label
      </Label>,
    );

    expect(getByTestId('label')).toHaveAttribute('aria-label', 'test');
    expect(getByTestId('label')).toHaveAttribute('data-whatever', 'on');
  });

  it('should proxy class names', () => {
    const { getByTestId } = render(<Label className='some-class-1 some-class-2'>Label</Label>);

    expect(getByTestId('label')).toHaveClass('Label', 'some-class-1', 'some-class-2');
  });

  it('should add required class when markAsRequired prop is present', () => {
    const { getByTestId } = render(<Label markAsRequired>Label</Label>);

    expect(getByTestId('required-mark')).toBeInTheDocument();
  });
});
