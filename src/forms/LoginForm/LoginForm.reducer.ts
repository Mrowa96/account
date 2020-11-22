import { LoginFormStateType, LoginFormActionType } from './LoginForm.types';

export const SET_EMAIL = 'SET_EMAIL';
export const SET_PASSWORD = 'SET_PASSWORD';
export const SET_FORM_ERROR = 'SET_FORM_ERROR';
export const SET_FIELDS_ERROR = 'SET_FIELDS_ERROR';
export const SET_SUBMIT_BUTTON_DISABLED = 'SET_SUBMIT_BUTTON_DISABLED';

export const INITIAL_STATE: LoginFormStateType = {
  fields: {
    email: {
      value: '',
      error: undefined,
    },
    password: {
      value: '',
      error: undefined,
    },
  },
  form: {
    error: undefined,
    submitButtonDisabled: false,
  },
};

export default function loginFormReducer(state: LoginFormStateType, action: LoginFormActionType): LoginFormStateType {
  switch (action.type) {
    case SET_EMAIL:
      return {
        fields: {
          ...state.fields,
          email: {
            value: action.payload,
            error: undefined,
          },
        },
        form: {
          ...state.form,
          error: undefined,
        },
      };

    case SET_PASSWORD:
      return {
        fields: {
          ...state.fields,
          password: {
            value: action.payload,
            error: undefined,
          },
        },
        form: {
          ...state.form,
          error: undefined,
        },
      };

    case SET_FORM_ERROR:
      return {
        fields: Object.entries(state.fields).reduce(
          (results, [fieldName, fieldData]) => ({
            ...results,
            [fieldName]: {
              value: fieldData.value,
              error: undefined,
            },
          }),
          { ...INITIAL_STATE.fields },
        ),
        form: {
          error: action.payload,
          submitButtonDisabled: false,
        },
      };

    case SET_FIELDS_ERROR:
      return {
        fields: Object.entries(state.fields).reduce(
          (results, [fieldName, fieldData]) => ({
            ...results,
            [fieldName]: {
              value: fieldData.value,
              error: action.payload.find(error => error.field === fieldName)?.message,
            },
          }),
          { ...INITIAL_STATE.fields },
        ),
        form: {
          error: undefined,
          submitButtonDisabled: false,
        },
      };

    case SET_SUBMIT_BUTTON_DISABLED:
      return {
        ...state,
        form: {
          ...state.form,
          submitButtonDisabled: action.payload,
        },
      };

    default:
      throw new Error('Undefined action');
  }
}
