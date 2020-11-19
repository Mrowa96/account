import React from 'react';
import { BoxPropsType } from './Box.types';
import styles from './Box.styles.scss';

// TODO Tests
export default function Box({ title, children }: BoxPropsType): JSX.Element {
  return (
    <article data-testid='box' className={styles.Box}>
      <h1 className={styles.Title}>{title}</h1>
      <div data-testid='content' className={styles.Content}>
        {children}
      </div>
    </article>
  );
}
