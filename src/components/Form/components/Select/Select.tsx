import React from 'react';
import classnames from 'classnames';
import { SelectPropsType } from './Select.types';
import styles from './Select.scss';

export default function Select({ className, children, ...props }: SelectPropsType): JSX.Element {
  return (
    <select className={classnames(styles.Select, className)} {...props}>
      {children}
    </select>
  );
}
