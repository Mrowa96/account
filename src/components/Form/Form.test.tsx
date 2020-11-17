import React from 'react';
import { render } from '@testing-library/react';
import Form from './Form';

describe('[Component] Form', () => {
  it('should render form with children', () => {
    const { getByRole } = render(<Form name='test-form'>Some controls or whatever</Form>);

    expect(getByRole('form')?.tagName).toEqual('FORM');
    expect(getByRole('form')).toHaveTextContent('Some controls or whatever');
  });

  it('should proxy all properties passed to component', () => {
    const { getByRole } = render(
      <Form name='test-form' aria-label='test' data-whatever='on'>
        Some controls or whatever
      </Form>,
    );

    expect(getByRole('form')).toHaveAttribute('aria-label', 'test');
    expect(getByRole('form')).toHaveAttribute('data-whatever', 'on');
  });

  it('should proxy class names', () => {
    const { getByRole } = render(
      <Form name='test-form' className='some-class-1 some-class-2'>
        Some controls or whatever
      </Form>,
    );

    expect(getByRole('form')).toHaveClass('Form', 'some-class-1', 'some-class-2');
  });
});
