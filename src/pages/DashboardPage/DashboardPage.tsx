import React from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@/components/Box';
import Icon from '@/components/Icon';
import StoredAccountData from '@/modules/StoredAccountData';
import Routes from '@/consts/routes';
import Button from '@/components/Button';
import styles from './DashboardPage.scss';

export default function DashboardPage(): JSX.Element | null {
  const history = useHistory();
  const accountData = StoredAccountData.get();

  function handleLogoutClick() {
    StoredAccountData.clear();
    history.replace(Routes.login.path);
  }

  if (!accountData) {
    history.replace(Routes.login.path);

    return null;
  }

  return (
    <Box title='Dashboard' contentClassName={styles.Content}>
      <div className={styles.Details}>
        <Icon name='user' />
        <span className={styles.Email}>{accountData.email}</span>
      </div>

      <div className={styles.ButtonWrapper}>
        <Button type='button' onClick={handleLogoutClick}>
          Logout
        </Button>
      </div>
    </Box>
  );
}
