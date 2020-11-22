import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import callApi from '@/helpers/callApi';
import LoginForm from '..';

jest.mock('@/helpers/callApi');

const successfullSubmitMock = jest.fn();
const consoleErrorSpy = jest.spyOn(console, 'error');

describe('[Form] LoginForm', () => {
  let component;

  beforeEach(() => {
    (callApi as jest.Mock).mockClear();
    consoleErrorSpy.mockImplementation(() => {});
    successfullSubmitMock.mockClear();

    component = <LoginForm onSuccessfulSubmit={successfullSubmitMock} />;
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should render form with required email and password fields', () => {
    const { getByRole, getByLabelText } = render(component);

    expect(getByRole('form')).toBeInTheDocument();
    expect(getByLabelText('Email')).toBeRequired();
    expect(getByLabelText('Email')).toHaveAttribute('type', 'email');
    expect(getByLabelText('Password')).toBeRequired();
    expect(getByLabelText('Password')).toHaveAttribute('type', 'password');
  });

  it('should render submit button in the form', () => {
    const { getByRole } = render(component);

    expect(getByRole('button')).toHaveTextContent('Login');
    expect(getByRole('button')).toHaveAttribute('type', 'submit');
  });

  test.each(['aaaaaaaa', '12345678', 'aB3cdef', 'abcd1234'])('should mark password field as invalid', password => {
    const { getByLabelText } = render(component);

    fireEvent.change(getByLabelText('Password'), { target: { value: password } });

    expect(getByLabelText('Password')).toBeInvalid();
  });

  test.each(['abcdEf1@', '1234ABCD'])('should mark password field as valid', password => {
    const { getByLabelText } = render(component);

    fireEvent.change(getByLabelText('Password'), { target: { value: password } });

    expect(getByLabelText('Password')).toBeValid();
  });

  it('should call onSuccessfulSubmit handler on 204 response from api', async () => {
    (callApi as jest.Mock).mockResolvedValue({
      status: 204,
    });

    const { getByLabelText, getByRole } = render(component);

    fireEvent.change(getByLabelText('Email'), {
      target: {
        value: 'test@example.com',
      },
    });
    fireEvent.change(getByLabelText('Password'), {
      target: {
        value: 'password',
      },
    });

    fireEvent.click(getByRole('button'));

    await waitFor(() => {
      expect(successfullSubmitMock).toHaveBeenCalledTimes(1);
      expect(successfullSubmitMock).toHaveBeenCalledWith('test@example.com');
    });
  });

  it('should display form error when api response status is different than 204 or 400', async () => {
    (callApi as jest.Mock).mockResolvedValue({
      status: 500,
    });

    const { getByLabelText, getByRole, getByTestId } = render(component);

    fireEvent.change(getByLabelText('Email'), {
      target: {
        value: 'test@example.com',
      },
    });
    fireEvent.change(getByLabelText('Password'), {
      target: {
        value: 'password',
      },
    });

    fireEvent.click(getByRole('button'));

    await waitFor(() => {
      expect(getByTestId('form-error')).toHaveTextContent('Unexpected error ocurred. Try again later.');
    });
  });

  it('should display fields errors when api response has status 400', async () => {
    (callApi as jest.Mock).mockResolvedValue({
      status: 400,
      json() {
        return {
          errors: [
            { field: 'email', message: 'Error in email field.' },
            { field: 'password', message: 'Error in password field.' },
          ],
        };
      },
    });

    const { getByLabelText, getByRole, getByTestId } = render(component);

    fireEvent.change(getByLabelText('Email'), {
      target: {
        value: 'test@example.com',
      },
    });
    fireEvent.change(getByLabelText('Password'), {
      target: {
        value: 'password',
      },
    });

    fireEvent.click(getByRole('button'));

    await waitFor(() => {
      expect(getByTestId('email-error')).toHaveTextContent('Error in email field.');
      expect(getByTestId('password-error')).toHaveTextContent('Error in password field.');
    });
  });
});
