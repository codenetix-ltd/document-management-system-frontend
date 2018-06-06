/* eslint-disable */
import axios from 'axios';
import { toast } from 'react-toastify';
import { API } from 'Config';
import ls from 'Services/SecureLS';

import store from 'Store';

import { $$errorsSet } from 'Store/thunks/errors';

const auth = ls.get('auth');
const { access_token, refresh_token } = auth;

if (!access_token) {
  throw new Error('No access_token found. Probably attempting to use request prior to authorization!');
}

axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
axios.defaults.headers.common['Content-Type'] = 'application/json';

/* if request fails with 401 try to refresh the token and reload the page */
axios.interceptors.response.use(res => res, err => {
  const { response } = err;
  if (response.status === 401) {
    const { email, password } = ls.get('c_cache');
    axios.defaults.headers.common['Authorization'] = `Bearer ${refresh_token}`;
    return new Promise((resolve, reject) => {
      axios.post(`${API.token}`, {
        grant_type: 'password',
        client_id: 1,
        client_secret: 'PASSWORD_GRANT_CLIENT_SECRET_PUBLIC',
        username: email,
        password
      }).then(({ data }) => {
        const authData = { ...data };
        authData.isAuthorized = true;
        ls.set('auth', authData);
        document.location.reload();
      }).catch(reject);
    });
    /* if request fails with validation error */
  } else if (response.status === 422) {
    const { errors, message } = response.data;
    if (errors) {
      $$errorsSet(store.dispatch, errors);
      message && toast.error(message);
    } else {
      message && toast.info(message);
    }
    return Promise.reject(err);
  }
  return Promise.reject(err);
});

export const request = {
  get(url, config) {
    return axios.get(url, config);
  },

  put(url, config) {
    return axios.put(url, config);
  },

  post(url, config) {
    return axios.post(url, config);
  },

  delete(url, config) {
    return axios.delete(url, config);
  },

  patch(url, config) {
    return axios.patch(url, config);
  }
};

export default request;
