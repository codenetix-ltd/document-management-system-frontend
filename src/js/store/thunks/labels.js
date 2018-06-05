import { API } from 'Config';
import axios from 'Services/request';

import {
  $loading,
  $labelsList,
  $label,
  $updateLabel
} from 'Store/actions';

import { $$messageSet } from 'Store/thunks/message';
import { $$errorSet } from 'Store/thunks/error';

import initialState from 'Store/reducers/initialState.json';

const fn = () => {};

export const $$labelsFetch = (dispatch, page, callback = fn) => {
  dispatch($loading(true));
  axios.get(API.labels, {
    params: { page }
  }).then(({ data }) => {
    dispatch($labelsList({
      list: data.data,
      lastPage: data.meta.lastPage
    }));
    dispatch($loading(false));
    callback(data);
  }).catch(err => {
    dispatch($loading(false));
    $$errorSet(dispatch, err);
  });
};

export const $$labelFetch = (dispatch, labelID, callback = fn) => {
  dispatch($loading(true));
  axios.get(`${API.labels}/${labelID}`).then(({ data }) => {
    dispatch($label({ ...data }));
    dispatch($loading(false));
    callback(data);
  }).catch(err => {
    dispatch($loading(false));
    $$errorSet(dispatch, err);
  });
};

export const $$labelUpdate = (dispatch, part) => {
  dispatch($updateLabel(part));
};

export const $$labelReset = (dispatch) => {
  dispatch($label(initialState.label));
};

export const $$labelDelete = (dispatch, { id, name }, close = fn) => {
  axios.delete(`${API.labels}/${id}`).then(() => {
    $$labelsFetch(dispatch, 1);
    $$messageSet(dispatch, {
      type: 'success',
      text: `The label ${name} was successfully deleted.`
    });
    close();
  }).catch(err => {
    close();
    $$errorSet(dispatch, err);
  });
};
