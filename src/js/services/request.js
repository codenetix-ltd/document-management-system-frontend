import axios from 'axios';
import store from 'Store';

function listener() {
  const state = store.getState();
  const token = state.auth['access_token'];
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

store.subscribe(listener);

const request = axios.create({
  headers: {
    'Content-Type': 'application/json',
  }
});

export default request;
