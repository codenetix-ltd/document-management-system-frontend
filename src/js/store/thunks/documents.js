import { API } from 'Config';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';

import axios from 'Services/request';

import {
  $loading,
  $document,
  $updateDocument,
  $documentsList,
  $setComparedDocuments
} from 'Store/actions';

import { $$messageSet } from 'Store/thunks/message';
import { $$errorSet } from 'Store/thunks/error';

import initialState from 'Store/reducers/initialState.json';

const fn = () => {};

export const $$documentsFetch = (dispatch, {
  page, sortField, sortDirection, filterSet
}, callback = fn) => {
  const filters = pickBy(filterSet, identity);
  dispatch($loading(true));
  axios.get(API.documents, {
    params: {
      page,
      sortField,
      sortDirection,
      ...filters
    }
  }).then(({ data }) => {
    dispatch($documentsList({
      list: data.data,
      lastPage: data.meta.lastPage,
      page,
      sortField,
      sortDirection
    }));
    dispatch($loading(false));
    callback(data);
  }).catch(err => {
    console.trace(err);
    dispatch($loading(false));
    $$errorSet(dispatch, err);
  });
};

export const $$documentFetch = (dispatch, documentID, callback = fn) => {
  dispatch($loading(true));
  axios.get(`${API.documents}/${documentID}`).then(({ data }) => {
    dispatch($document({ ...data }));
    dispatch($loading(false));
    callback(data);
  }).catch(err => {
    console.trace(err);
    dispatch($loading(false));
    $$errorSet(dispatch, err);
  });
};

export const $$documentUpdate = (dispatch, part) => {
  dispatch($updateDocument(part));
};

export const $$documentReset = (dispatch) => {
  dispatch($document(initialState.document));
};

export const $$documentDelete = (dispatch, { id, name }, close = fn) => {
  axios.delete(`${API.documents}/${id}`).then(() => {
    $$documentsFetch(dispatch, 1);
    $$messageSet(dispatch, {
      type: 'success',
      text: `The document ${name} was successfully deleted.`
    });
    close();
  }).catch(err => {
    console.trace(err);
    close();
    $$errorSet(dispatch, err);
  });
};

export const $$documentsMassDelete = (dispatch, ids, close = fn) => {
  // todo: maybe better use axios.all here
  const p = Promise.all(ids.map(id => axios.delete(`${API.documents}/${id}`)));
  p.then(() => {
    $$documentsFetch(dispatch, 1);
    $$messageSet(dispatch, {
      type: 'success',
      text: 'Selected documents were successfully deleted.'
    });
    close();
  }).catch(err => {
    console.trace(err);
    close();
    $$errorSet(dispatch, err);
  });
};

export const $$comparedDocumentsFetch = (dispatch, ids, callback = fn) => {
  const p = Promise.all(ids.map(id => axios.get(`${API.documents}/${id}`)));
  p.then(d => {
    dispatch($setComparedDocuments(d.map(({ data }) => data)));
    callback(d);
  }).catch(err => {
    console.trace(err);
  });
};
