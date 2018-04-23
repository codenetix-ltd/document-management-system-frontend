import { getURL } from 'Config';
import axios from 'axios';

import {
  $loading,
  $versionsList,
  $version
} from 'Store/actions';

import { $$errorSet } from 'Store/thunks/error';

import initialState from 'Store/reducers/initialState.json';

const fn = () => {};

export const $$versionsFetch = (dispatch, documentID, callback = fn) => {
  const url = getURL('versions', documentID);
  axios.get(url).then(({ data: { data } }) => {
    dispatch($versionsList({ list: data }));
    callback(data);
  }).catch(err => {
    console.trace(err);
    $$errorSet(dispatch, err);
  });
};

export const $$versionFetch = (dispatch, documentID, versionID, callback = fn) => {
  dispatch($loading(true));
  const url = getURL('versions', documentID);
  axios.get(`${url}/${versionID}`).then(({ data }) => {
    dispatch($version({ ...data }));
    dispatch($loading(false));
    callback(data);
  }).catch(err => {
    console.trace(err);
    dispatch($loading(false));
    $$errorSet(dispatch, err);
  });
};

export const $$versionReset = (dispatch) => {
  dispatch($version(initialState.version));
};
