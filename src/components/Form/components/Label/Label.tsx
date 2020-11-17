import React from 'react';
import classnames from 'classnames';
import { LabelPropsType } from './Label.types';
import styles from './Label.scss';

export default function Label({ children, className, markAsRequired, ...props }: LabelPropsType): JSX.Element {
  return (
    <label data-testid='label' className={classnames(styles.Label, className)} {...props}>
      {children}
      {markAsRequired && (
        <span data-testid='required-mark' className={styles.RequiredMark}>
          (Required)
        </span>
      )}
    </label>
  );
}
