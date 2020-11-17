import React from 'react';
import IconPropsType from './Icon.types';

export default function Icon({ name, ...props }: IconPropsType): JSX.Element {
  return <span {...props} data-testid='icon' data-icon={name} aria-hidden />;
}
