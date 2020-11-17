import React from 'react';
import { render } from '@testing-library/react';
import Select from '.';

describe('[Component] Select', () => {
  it('should render select with attributes', () => {
    const { getByRole } = render(<Select aria-label='test' data-whatever='on' />);

    expect(getByRole('combobox')?.tagName).toEqual('SELECT');
    expect(getByRole('combobox')).toHaveAttribute('aria-label', 'test');
    expect(getByRole('combobox')).toHaveAttribute('data-whatever', 'on');
  });

  it('should proxy class names', () => {
    const { getByRole } = render(<Select className='some-class-1 some-class-2' />);

    expect(getByRole('combobox')).toHaveClass('Select', 'some-class-1', 'some-class-2');
  });

  it('should display passed options', () => {
    const { getByRole } = render(
      <Select>
        <option>a</option>
        <option>b</option>
      </Select>,
    );

    expect(getByRole('combobox').querySelectorAll('option')).toHaveLength(2);
  });
});
