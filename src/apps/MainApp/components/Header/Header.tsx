import React from 'react';
import { Link } from 'react-router-dom';
import Routes from '@/consts/routes';
import styles from './Header.scss';

export default function Header(): JSX.Element {
  return (
    <header className={styles.Header}>
      <Link to={Routes.dashboard.path} className={styles.LogoLink}>
        <h1 className={styles.Logo}>Account</h1>
      </Link>
    </header>
  );
}
