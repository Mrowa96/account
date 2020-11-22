import React from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@/components/Box';
import StoredAccountData from '@/modules/StoredAccountData';
import Routes from '@/consts/routes';
import LoginForm from '@/forms/LoginForm';

export default function LoginPage(): JSX.Element | null {
  const history = useHistory();

  function handleSuccessfulSubmit(email: string) {
    StoredAccountData.store(email);
    history.push(Routes.dashboard.path);
  }

  if (StoredAccountData.get()) {
    history.replace(Routes.dashboard.path);

    return null;
  }

  return (
    <Box title='Login'>
      <LoginForm onSuccessfulSubmit={handleSuccessfulSubmit} />
    </Box>
  );
}
