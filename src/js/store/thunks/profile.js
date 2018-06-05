import { API } from 'Config';

import {
  $profile,
  $updateProfile
} from 'Store/actions';

import initialState from 'Store/reducers/initialState.json';

const fn = () => {};

export const $$profileFetch = (dispatch, callback = fn) => {
  import('Services/request').then(({ request }) => {
    request.get(`${API.profile}`).then(({ data }) => {
      dispatch($profile({ ...data }));
      callback(data);
    });
  });
};

export const $$profileUpdate = (dispatch, part) => {
  dispatch($updateProfile(part));
};

export const $$profileReset = (dispatch) => {
  dispatch($profile(initialState.profile));
};
