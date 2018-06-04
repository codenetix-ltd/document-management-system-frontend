import axios from 'axios';
import ls from 'Services/SecureLS';

const auth = ls.get('auth');
const token = auth['access_token'];

if (!token) {
  throw new Error('No access_token found. Probably attempting to use request prior to authorization!');
}

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.interceptors.response.use(res => res, err => {
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
