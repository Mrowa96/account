import reducer, {
  INITIAL_STATE,
  SET_EMAIL,
  SET_FIELDS_ERROR,
  SET_FORM_ERROR,
  SET_PASSWORD,
  SET_SUBMIT_BUTTON_DISABLED,
} from '../LoginForm.reducer';

describe('[Form] LoginForm reducer', () => {
  it('should set email', () => {
    const state = reducer(INITIAL_STATE, {
      type: SET_EMAIL,
      payload: 'new@email.com',
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      fields: {
        ...INITIAL_STATE.fields,
        email: { value: 'new@email.com', error: undefined },
      },
    });
  });

  it('should set passowrd', () => {
    const state = reducer(INITIAL_STATE, {
      type: SET_PASSWORD,
      payload: 'zaq1@WSX',
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      fields: {
        ...INITIAL_STATE.fields,
        password: { value: 'zaq1@WSX', error: undefined },
      },
    });
  });

  it('should set submitButtonDisabled property', () => {
    const state = reducer(INITIAL_STATE, {
      type: SET_SUBMIT_BUTTON_DISABLED,
      payload: true,
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      form: { ...INITIAL_STATE.form, submitButtonDisabled: true },
    });
  });

  it('should set form error', () => {
    const state = reducer(
      { ...INITIAL_STATE, form: { ...INITIAL_STATE.form, submitButtonDisabled: true } },
      {
        type: SET_FORM_ERROR,
        payload: 'Error',
      },
    );

    expect(state).toEqual({
      ...INITIAL_STATE,
      form: { submitButtonDisabled: false, error: 'Error' },
    });
  });

  it('should set fields error', () => {
    const state = reducer(
      {
        ...INITIAL_STATE,
        fields: {
          email: {
            value: 'test@email.com',
            error: undefined,
          },
          password: {
            value: 'zaq1@WSX',
            error: undefined,
          },
        },
        form: {
          ...INITIAL_STATE.form,
          submitButtonDisabled: true,
        },
      },
      {
        type: SET_FIELDS_ERROR,
        payload: [
          {
            field: 'email',
            message: 'email error',
          },
          {
            field: 'password',
            message: 'password error',
          },
          {
            field: 'name',
            message: 'name error',
          },
        ],
      },
    );

    expect(state).toEqual({
      fields: {
        email: {
          value: 'test@email.com',
          error: 'email error',
        },
        password: {
          value: 'zaq1@WSX',
          error: 'password error',
        },
      },
      form: {
        error: undefined,
        submitButtonDisabled: false,
      },
    });
  });
});
