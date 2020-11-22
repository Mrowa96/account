import React from 'react';
import styles from './Footer.scss';

export default function Footer(): JSX.Element {
  return (
    <footer className={styles.Footer}>
      <p className={styles.Text}>
        Created by
        <a className={styles.Link} href='https://pawel-mrowiec.dev/' target='_blank' rel='noreferrer noopener'>
          Paweł Mrowiec
        </a>
      </p>
    </footer>
  );
}
