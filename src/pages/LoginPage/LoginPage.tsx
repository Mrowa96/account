import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import classnames from 'classnames';
import Box from '@/components/Box';
import Button from '@/components/Button';
import StoredAccountData from '@/modules/StoredAccountData';
import callApi from '@/helpers/callApi';
import HttpCode from '@/consts/httpCode';
import { BadRequestResponse } from '@/types';
import Routes from '@/consts/routes';
import styles from './LoginPage.scss';

// TODO Cleanup and write tests
export default function LoginPage(): JSX.Element | null {
  const [payload, setPayload] = useState({ email: '', password: '' });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [unexpectedError, setUnexpectedError] = useState(false);
  const history = useHistory();

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setButtonDisabled(true);

    try {
      // TODO Use abort controller?
      const response = await callApi('/login', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (response.status === HttpCode.NoContent) {
        StoredAccountData.store(payload.email);
        history.push(Routes.dashboard.path);

        return;
      }

      if (response.status === HttpCode.BadRequest) {
        const data = (await response.json()) as BadRequestResponse;
        const formNode = event.target as HTMLFormElement;

        data.errors.forEach(error => {
          const control = formNode.elements.namedItem(error.field) as HTMLInputElement | null;

          if (control) {
            control.setCustomValidity(error.message);
          }
        });

        formNode.reportValidity();

        setButtonDisabled(false);

        return;
      }

      throw Error('Unexpected error.');
    } catch (error) {
      setUnexpectedError(true);
      setButtonDisabled(false);

      console.error(error);
    }
  }

  function handleControlChange(control: string, event: FormEvent<HTMLInputElement>) {
    event.currentTarget.setCustomValidity('');

    setUnexpectedError(false);
    setPayload({
      ...payload,
      [control]: event.currentTarget.value,
    });
  }

  function handleEmailChange(event: FormEvent<HTMLInputElement>) {
    handleControlChange('email', event);
  }

  function handlePasswordChange(event: FormEvent<HTMLInputElement>) {
    handleControlChange('password', event);
  }

  if (StoredAccountData.has()) {
    history.replace(Routes.dashboard.path);

    return null;
  }

  return (
    <Box title='Login'>
      <form className={styles.Form} aria-label='Login form' onSubmit={handleFormSubmit}>
        <div className={styles.Row}>
          <label className={styles.Label} htmlFor='email'>
            Email
          </label>
          <input
            className={styles.Input}
            type='email'
            id='email'
            autoComplete='username'
            onChange={handleEmailChange}
            value={payload.email}
            required
          />
        </div>

        <div className={styles.Row}>
          <label className={styles.Label} htmlFor='password'>
            Password
          </label>
          <input
            // TODO Create pattern
            className={styles.Input}
            type='password'
            id='password'
            autoComplete='current-password'
            onChange={handlePasswordChange}
            value={payload.password}
            required
          />
        </div>

        <div className={classnames(styles.Row, styles.ButtonAndErrorWrapper)}>
          {unexpectedError && <span className={styles.Error}>Unexpected error ocurred. Try again later.</span>}

          <Button type='submit' disabled={buttonDisabled} className={styles.Button}>
            Login
          </Button>
        </div>
      </form>
    </Box>
  );
}
