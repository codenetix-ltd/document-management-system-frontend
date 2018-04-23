import { API } from 'Config';
import axios from 'axios';

import ls from 'Services/SecureLS';

import {
  $setAuth,
  $updateAuth
} from 'Store/actions';

import initialState from 'Store/reducers/initialState.json';

const fn = () => {};

export const $$authFetch = (dispatch, user, callback = fn) => {
  axios.post(`${API.token}`, {
    grantType: 'password',
    clientId: 'cohesive',
    clientSecret: 'local area network',
    username: user.email,
    password: user.password,
    scope: 'Global'
  }).then(({ data }) => {
    dispatch($setAuth({ ...data }));
    callback(data);
  }).catch(err => {
    console.trace(err);
  });
};

export const $$authUpdate = (dispatch, part) => {
  dispatch($updateAuth(part));
};

export const $$authReset = (dispatch) => {
  dispatch($setAuth(initialState.auth));
  ls.set('auth', { isAuthorized: false });
};

export const $$logIn = (dispatch) => {
  dispatch($updateAuth({ isAuthorized: true }));
  ls.set('auth', { isAuthorized: true });
};

export const $$logOut = (dispatch) => {
  dispatch($updateAuth({ isAuthorized: false }));
  ls.set('auth', { isAuthorized: false });
};
