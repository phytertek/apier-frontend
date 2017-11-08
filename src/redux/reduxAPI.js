import axios from 'axios';
import { push } from 'react-router-redux';
import { API_HOST } from '../appConfig';

const API_POST_AUTH_REGISTER = 'API_POST_AUTH_REGISTER';
export const API_POST_AUTH_REGISTER_SENT = 'API_POST_AUTH_REGISTER_SENT';
export const API_POST_AUTH_REGISTER_SUCCESS = 'API_POST_AUTH_REGISTER_SUCCESS';
export const API_POST_AUTH_REGISTER_ERROR = 'API_POST_AUTH_REGISTER_ERROR';
export const apiPostAuthRegister = form => ({
  type: API_POST_AUTH_REGISTER,
  payload: form
});

const API_POST_AUTH_LOGIN = 'API_POST_AUTH_LOGIN';
export const API_POST_AUTH_LOGIN_SENT = 'API_POST_AUTH_LOGIN_SENT';
export const API_POST_AUTH_LOGIN_SUCCESS = 'API_POST_AUTH_LOGIN_SUCCESS';
export const API_POST_AUTH_LOGIN_ERROR = 'API_POST_AUTH_LOGIN_ERROR';
export const apiPostAuthLogin = form => ({
  type: API_POST_AUTH_LOGIN,
  payload: form
});

const reduxAPI = store => next => action => {
  next(action);
  switch (action.type) {
    case API_POST_AUTH_REGISTER:
      console.log(`I'm here... what next?`);
      axios
        .post(`${API_HOST}/auth/register`, action.payload)
        .then(response => {
          store.dispatch(push('/home'));
          return next({
            type: API_POST_AUTH_REGISTER_SUCCESS,
            payload: response
          });
        })
        .catch(error => {
          return next({ type: API_POST_AUTH_REGISTER_ERROR, payload: error });
        });
      break;
    case API_POST_AUTH_LOGIN:
      axios
        .post(`${API_HOST}/auth/login`, action.payload)
        .then(response => {
          store.dispatch(push('/home'));
          return next({
            type: API_POST_AUTH_LOGIN_SUCCESS,
            payload: response
          });
        })
        .catch(error => {
          return next({ type: API_POST_AUTH_LOGIN_ERROR, payload: error });
        });
      break;
    default:
      break;
  }
};

export default reduxAPI;
