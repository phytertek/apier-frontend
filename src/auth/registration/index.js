import {
  API_POST_AUTH_REGISTER_SENT,
  API_POST_AUTH_REGISTER_ERROR,
  API_POST_AUTH_REGISTER_SUCCESS
} from '../../redux/reduxAPI';
const REGISTRATION_FORM_INPUT = 'REGISTRATION_FORM_INPUT';
export const registrationFormInput = validatedField => ({
  type: REGISTRATION_FORM_INPUT,
  payload: validatedField
});

const REGISTRATION_FORM_ERRORS = 'REGISTRATION_FORM_ERRORS';
export const registrationFormErrors = form => ({
  type: REGISTRATION_FORM_ERRORS,
  payload: form
});

const initState = {
  firstName: {},
  lastName: {},
  email: {},
  password: {},
  confirmPassword: {}
};
export default (state = initState, { type, payload }) => {
  switch (type) {
    case REGISTRATION_FORM_ERRORS:
      return payload;
    case REGISTRATION_FORM_INPUT:
      return Object.assign({}, state, payload);
    case API_POST_AUTH_REGISTER_ERROR:
      let error;
      if (
        payload.response &&
        payload.response.data.error.split(' ').includes('E11000')
      ) {
        error = 'User already exists';
      } else error = payload.response.data.error;
      return Object.assign({}, state, { email: { value: state.email, error } });
    case API_POST_AUTH_REGISTER_SUCCESS:
      return initState;
    default:
      return state;
  }
};
