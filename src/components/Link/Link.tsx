import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import classnames from 'classnames';
import { LinkPropsType } from './Link.types';
import styles from './Link.scss';

export default function Link({ children, className, ...props }: LinkPropsType): JSX.Element {
  return (
    <RouterLink {...props} className={classnames(styles.Link, className)}>
      {children}
    </RouterLink>
  );
}
