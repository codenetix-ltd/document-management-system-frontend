import axios from 'axios';
import store from 'Store/index';

function listener() {
  const state = store.getState();
  const token = state.auth['accessToken'];
  axios.defaults.headers.common['Authorization'] = token;
}

store.subscribe(listener);

const request = axios.create({
  headers: {
    'Content-Type': 'application/json',
  }
});

export default request;
