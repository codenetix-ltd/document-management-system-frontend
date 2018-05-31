import axios from 'axios';
import ls from 'Services/SecureLS';

const auth = ls.get('auth');
const token = auth['access_token'];

if (!token) {
  throw new Error('No access_token found. Probably attempting to use request prior to authorization!');
}

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

/* todo: rewrite this as a set of methods to avoid executing on synchronous import */
export const request = axios.create({
  headers: {
    'Content-Type': 'application/json',
  }
});

export default request;
