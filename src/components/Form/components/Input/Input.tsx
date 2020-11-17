import React from 'react';
import classnames from 'classnames';
import { InputPropsType } from './Input.types';
import styles from './Input.scss';

export default function Input({ className, autoComplete = 'off', ...props }: InputPropsType): JSX.Element {
  return <input autoComplete={autoComplete} className={classnames(styles.Input, className)} {...props} />;
}
