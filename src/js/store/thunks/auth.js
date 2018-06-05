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
    grant_type: 'password',
    client_id: 1,
    client_secret: 'PASSWORD_GRANT_CLIENT_SECRET_PUBLIC',
    username: user.email,
    password: user.password
  }).then(({ data }) => {
    const auth = { isAuthorized: false, ...data };
    dispatch($setAuth(auth));
    ls.set('auth', auth);
    callback(data);
  });
};

/* export const $$authUpdate = (dispatch, part) => {
  dispatch($updateAuth(part));
}; */

export const $$authReset = (dispatch) => {
  dispatch($setAuth(initialState.auth));
  ls.set('auth', initialState.auth);
};

export const $$logIn = (dispatch) => {
  dispatch($updateAuth({ isAuthorized: true }));
  const auth = ls.get('auth');
  auth.isAuthorized = true;
  ls.set('auth', auth);
};

export const $$logOut = (dispatch) => {
  import('Services/request').then(({ request }) => {
    request.post(API.logout).then(() => {
      dispatch($updateAuth({ isAuthorized: false }));
      const auth = ls.get('auth');
      auth.isAuthorized = false;
      ls.set('auth', auth);
    });
  });
};
