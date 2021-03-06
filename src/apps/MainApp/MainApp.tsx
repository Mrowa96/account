import React, { StrictMode } from 'react';
import { Switch, Route } from 'react-router-dom';
import MainPage from '@/pages/DashboardPage';
import NotFoundPage from '@/pages/NotFoundPage';
import LoginPage from '@/pages/LoginPage';
import Routes from '@/consts/routes';
import Header from './components/Header';
import Footer from './components/Footer';
import styles from './MainApp.scss';

export default function MainApp(): JSX.Element {
  return (
    <StrictMode>
      <Header />

      <main className={styles.Content}>
        <Switch>
          <Route path={Routes.dashboard.path} exact>
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

      <Footer />
    </StrictMode>
  );
}
