export type LoginFormPropsType = {
  onSuccessfulSubmit: (email: string) => void;
};

export type LoginFormStateType = {
  fields: {
    email: {
      value: string;
      error?: string;
    };
    password: {
      value: string;
      error?: string;
    };
  };
  form: {
    error?: string;
    submitButtonDisabled: boolean;
  };
};

export type LoginFormActionType =
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'SET_SUBMIT_BUTTON_DISABLED'; payload: boolean }
  | { type: 'SET_FIELDS_ERROR'; payload: { field: string; message: string }[] }
  | { type: 'SET_FORM_ERROR'; payload: string };
