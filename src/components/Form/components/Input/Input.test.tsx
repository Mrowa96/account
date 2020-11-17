import React from 'react';
import { render } from '@testing-library/react';
import Input from '.';

describe('[Component] Input', () => {
  it('should render input with attributes', () => {
    const { getByRole } = render(<Input type='text' aria-label='test' data-whatever='on' />);

    expect(getByRole('textbox')?.tagName).toEqual('INPUT');
    expect(getByRole('textbox')).toHaveAttribute('type', 'text');
    expect(getByRole('textbox')).toHaveAttribute('aria-label', 'test');
    expect(getByRole('textbox')).toHaveAttribute('data-whatever', 'on');
    expect(getByRole('textbox')).toHaveAttribute('autocomplete', 'off');
  });

  it('should proxy class names', () => {
    const { getByRole } = render(<Input className='some-class-1 some-class-2' />);

    expect(getByRole('textbox')).toHaveClass('Input', 'some-class-1', 'some-class-2');
  });
});
