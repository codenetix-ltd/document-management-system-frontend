import { API } from 'Config';
import axios from 'axios';

import {
  $profile,
  $updateProfile
} from 'Store/actions';

import initialState from 'Store/reducers/initialState.json';

const fn = () => {};

export const $$profileFetch = (dispatch, callback = fn) => {
  axios.get(`${API.profile}`).then(({ data }) => {
    dispatch($profile({ ...data }));
    callback(data);
  }).catch(err => {
    console.trace(err);
  });
};

export const $$profileUpdate = (dispatch, part) => {
  dispatch($updateProfile(part));
};

export const $$profileReset = (dispatch) => {
  dispatch($profile(initialState.profile));
};
