import { API } from 'Config';
import axios from 'axios';

import {
  $loading,
  $templatesList,
  $template,
  $updateTemplate
} from 'Store/actions';

import { $$messageSet } from 'Store/thunks/message';
import { $$errorSet } from 'Store/thunks/error';

import initialState from 'Store/reducers/initialState.json';

const fn = () => {};

export const $$templatesFetch = (dispatch, page, callback = fn) => {
  dispatch($loading(true));
  axios.get(API.templates, {
    params: { page }
  }).then(({ data }) => {
    dispatch($templatesList({
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

export const $$templateFetch = (dispatch, templateID, callback = fn) => {
  dispatch($loading(true));
  axios.get(`${API.templates}/${templateID}`).then(({ data }) => {
    dispatch($template({ ...data }));
    dispatch($loading(false));
    callback(data);
  }).catch(err => {
    console.trace(err);
    dispatch($loading(false));
    $$errorSet(dispatch, err);
  });
};

export const $$templateUpdate = (dispatch, part) => {
  dispatch($updateTemplate(part));
};

export const $$templateReset = (dispatch) => {
  dispatch($template(initialState.template));
};

export const $$templateDelete = (dispatch, { id, name }, close = fn) => {
  axios.delete(`${API.templates}/${id}`).then(() => {
    $$templatesFetch(dispatch, 1);
    $$messageSet(dispatch, {
      type: 'success',
      text: `The template ${name} was successfully deleted.`
    });
    close();
  }).catch(err => {
    console.trace(err);
    close();
    $$errorSet(dispatch, err);
  });
};
