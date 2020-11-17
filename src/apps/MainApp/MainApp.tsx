import React, { StrictMode } from 'react';
import { Switch, Route } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import NotFoundPage from '@/pages/NotFoundPage';
import routes from '@/consts/routes';
import styles from './MainApp.scss';

export default function MainApp(): JSX.Element {
  return (
    <StrictMode>
      <main data-testid='content' className={styles.Content}>
        <Switch>
          <Route path={routes.main.path} exact>
            <MainPage />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </main>
    </StrictMode>
  );
}
