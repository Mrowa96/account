import React from 'react';
import classnames from 'classnames';
import { FormPropsType } from './Form.types';
import styles from './Form.scss';

export default function Form({ children, className, ...props }: FormPropsType): JSX.Element {
  return (
    <form className={classnames(styles.Form, className)} {...props}>
      {children}
    </form>
  );
}
