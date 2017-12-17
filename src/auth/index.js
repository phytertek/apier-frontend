import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { combineReducers } from 'redux';
import {
  API_POST_AUTH_REGISTER_SUCCESS,
  API_POST_AUTH_LOGIN_SUCCESS
} from '../redux/reduxAPI';
import registration from './registration';
import login from './login';

const localStorageConfig = {
  key: 'auth',
  storage
};

const initState = {
  authToken: '',
  isAuth: false
};

const token = (state = initState, { type, payload }) => {
  switch (type) {
    case API_POST_AUTH_REGISTER_SUCCESS:
      return Object.assign({}, state, {
        isAuth: true,
        authToken: payload.data.token
      });
    case API_POST_AUTH_LOGIN_SUCCESS:
        return Object.assign({}, state, {
        isAuth: true,
        authToken: payload.data.token
      });
    default:
      return state;
  }
};

const persistentAuth = persistReducer(localStorageConfig, token);

export default combineReducers({ token: persistentAuth, registration, login });
