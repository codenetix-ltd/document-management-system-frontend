import { API } from 'Config';
import axios from 'Services/request';

import {
  $loading,
  $rolesList,
  $role,
  $updateRole
} from 'Store/actions';

import { $$messageSet } from 'Store/thunks/message';
import { $$errorSet } from 'Store/thunks/error';

import initialState from 'Store/reducers/initialState.json';

const fn = () => {};

export const $$rolesFetch = (dispatch, page, callback = fn) => {
  dispatch($loading(true));
  axios.get(API.roles, {
    params: { page }
  }).then(({ data }) => {
    dispatch($rolesList({
      list: data.data,
      lastPage: data.meta.lastPage
    }));
    dispatch($loading(false));
    callback(data);
  }).catch(err => {
    console.trace(err);
    dispatch($loading(false));
    $$errorSet(dispatch, err);
  });
};

export const $$roleFetch = (dispatch, roleID, callback = fn) => {
  dispatch($loading(true));
  axios.get(`${API.roles}/${roleID}`).then(({ data }) => {
    dispatch($role({ ...data }));
    dispatch($loading(false));
    callback(data);
  }).catch(err => {
    console.trace(err);
    dispatch($loading(false));
    $$errorSet(dispatch, err);
  });
};

export const $$roleUpdate = (dispatch, part) => {
  dispatch($updateRole(part));
};

export const $$roleReset = (dispatch) => {
  dispatch($role(initialState.role));
};

export const $$roleDelete = (dispatch, { id, name }, close = fn) => {
  axios.delete(`${API.roles}/${id}`).then(() => {
    $$rolesFetch(dispatch, 1);
    $$messageSet(dispatch, {
      type: 'success',
      text: `The role ${name} was successfully deleted.`
    });
    close();
  }).catch(err => {
    console.trace(err);
    close();
    $$errorSet(dispatch, err);
  });
};
