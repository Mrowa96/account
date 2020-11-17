import React from 'react';
import { render } from '@testing-library/react';
import Icon from '.';

describe('[Component] Icon', () => {
  it('should render icon with data-name and aria-hidden attributes', () => {
    const component = <Icon name='test' />;
    const { getByTestId } = render(component);

    expect(getByTestId('icon')).toBeDefined();
    expect(getByTestId('icon').getAttribute('data-icon')).toEqual('test');
    expect(getByTestId('icon').getAttribute('aria-hidden')).toEqual('true');
  });

  it('should render icon passed other props', () => {
    const component = <Icon name='test' className='some-class' />;
    const { getByTestId } = render(component);

    expect(getByTestId('icon').classList.contains('some-class')).toBeTruthy();
  });
});
