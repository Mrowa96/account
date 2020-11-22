import React from 'react';
import classnames from 'classnames';
import { BoxPropsType } from './Box.types';
import styles from './Box.styles.scss';

export default function Box({ title, children, disablePadding }: BoxPropsType): JSX.Element {
  return (
    <article className={styles.Box}>
      <h1 className={styles.Title}>{title}</h1>
      <div data-testid='content' className={classnames(styles.Content, { [styles.WithoutPadding]: disablePadding })}>
        {children}
      </div>
    </article>
  );
}
