import {
  API_POST_AUTH_LOGIN_SENT,
  API_POST_AUTH_LOGIN_ERROR,
  API_POST_AUTH_LOGIN_SUCCESS
} from '../../redux/reduxAPI';
const LOGIN_FORM_INPUT = 'LOGIN_FORM_INPUT';
export const loginFormInput = validatedField => ({
  type: LOGIN_FORM_INPUT,
  payload: validatedField
});

const LOGIN_FORM_ERRORS = 'LOGIN_FORM_ERRORS';
export const loginFormErrors = form => ({
  type: LOGIN_FORM_ERRORS,
  payload: form
});

const initState = {
  email: {},
  password: {},
  confirmPassword: {}
};
export default (state = initState, { type, payload }) => {
  switch (type) {
    case LOGIN_FORM_ERRORS:
      return Object.assign({}, state, payload);
    case LOGIN_FORM_INPUT:
      return Object.assign({}, state, payload);
    case API_POST_AUTH_LOGIN_SUCCESS:
      return Object.assign({}, state, initState);
    default:
      return state;
  }
};
