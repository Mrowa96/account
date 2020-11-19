import React, { StrictMode } from 'react';
import { Switch, Route } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import NotFoundPage from '@/pages/NotFoundPage';
import LoginPage from '@/pages/LoginPage';
import Routes from '@/consts/routes';
import styles from './MainApp.scss';

export default function MainApp(): JSX.Element {
  return (
    <StrictMode>
      <main data-testid='content' className={styles.Content}>
        <Switch>
          <Route path={Routes.main.path} exact>
            <MainPage />
          </Route>
          <Route path={Routes.login.path} exact>
            <LoginPage />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </main>
    </StrictMode>
  );
}
