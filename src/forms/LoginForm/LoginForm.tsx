import React, { FormEvent, useReducer } from 'react';
import classnames from 'classnames';
import Button from '@/components/Button';
import callApi from '@/helpers/callApi';
import HttpCode from '@/consts/httpCode';
import loginFormReducer, {
  INITIAL_STATE,
  SET_EMAIL,
  SET_FIELDS_ERROR,
  SET_FORM_ERROR,
  SET_PASSWORD,
  SET_SUBMIT_BUTTON_DISABLED,
} from './LoginForm.reducer';
import { LoginFormPropsType } from './LoginForm.types';
import styles from './LoginForm.scss';

export default function LoginForm({ onSuccessfulSubmit }: LoginFormPropsType): JSX.Element {
  const [state, dispatch] = useReducer(loginFormReducer, INITIAL_STATE);

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    dispatch({
      type: SET_SUBMIT_BUTTON_DISABLED,
      payload: true,
    });

    try {
      const response = await callApi('/login', {
        method: 'POST',
        body: JSON.stringify({
          email: state.fields.email.value,
          password: state.fields.password.value,
        }),
      });

      if (response.status === HttpCode.NoContent) {
        onSuccessfulSubmit(state.fields.email.value);

        return;
      }

      if (response.status === HttpCode.BadRequest) {
        const data = (await response.json()) as { errors: { field: string; message: string }[] };

        dispatch({
          type: SET_FIELDS_ERROR,
          payload: data.errors,
        });

        return;
      }

      throw Error('Unexpected error.');
    } catch (error) {
      dispatch({
        type: SET_FORM_ERROR,
        payload: 'Unexpected error ocurred. Try again later.',
      });

      console.error(error);
    }
  }

  function handleEmailChange(event: FormEvent<HTMLInputElement>) {
    dispatch({
      type: SET_EMAIL,
      payload: event.currentTarget.value,
    });
  }

  function handlePasswordChange(event: FormEvent<HTMLInputElement>) {
    dispatch({
      type: SET_PASSWORD,
      payload: event.currentTarget.value,
    });
  }

  return (
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
          value={state.fields.email.value}
          required
        />
        {state.fields.email.error && (
          <span data-testid='email-error' className={styles.Error}>
            {state.fields.email.error}
          </span>
        )}
      </div>

      <div className={styles.Row}>
        <label className={styles.Label} htmlFor='password'>
          Password
        </label>
        <input
          className={styles.Input}
          type='password'
          id='password'
          autoComplete='current-password'
          onChange={handlePasswordChange}
          value={state.fields.password.value}
          pattern='^(?=.*\d)(?=.*[A-Z]).{8,}$'
          title='Password must contain at least one number, one upper letter and be longer than eight characters.'
          required
        />
        {state.fields.password.error && (
          <span data-testid='password-error' className={styles.Error}>
            {state.fields.password.error}
          </span>
        )}
      </div>

      <div className={classnames(styles.Row, styles.ButtonAndErrorWrapper)}>
        {state.form.error && (
          <span data-testid='form-error' className={styles.Error}>
            {state.form.error}
          </span>
        )}

        <Button type='submit' disabled={state.form.submitButtonDisabled} className={styles.Button}>
          Login
        </Button>
      </div>
    </form>
  );
}
