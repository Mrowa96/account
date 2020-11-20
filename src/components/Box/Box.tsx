import React from 'react';
import classnames from 'classnames';
import { BoxPropsType } from './Box.types';
import styles from './Box.styles.scss';

export default function Box({ title, children, contentClassName }: BoxPropsType): JSX.Element {
  return (
    <article data-testid='box' className={styles.Box}>
      <h1 className={styles.Title}>{title}</h1>
      <div data-testid='content' className={classnames(styles.Content, contentClassName)}>
        {children}
      </div>
    </article>
  );
}
