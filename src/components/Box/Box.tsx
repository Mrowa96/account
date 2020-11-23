import React from 'react';
import classnames from 'classnames';
import { BoxPropsType } from './Box.types';
import styles from './Box.scss';

export default function Box({ title, children, disablePadding }: BoxPropsType): JSX.Element {
  return (
    <article className={styles.Box}>
      <h2 className={styles.Title}>{title}</h2>
      <div data-testid='content' className={classnames(styles.Content, { [styles.WithoutPadding]: disablePadding })}>
        {children}
      </div>
    </article>
  );
}
