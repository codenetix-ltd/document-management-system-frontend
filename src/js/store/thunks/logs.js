import { API } from 'Config';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';

import axios from 'Services/request';

import {
  $loading,
  $logsList,
} from 'Store/actions';

import { $$errorSet } from 'Store/thunks/error';

const fn = () => {};

export const $$logsFetch = (dispatch, {
  page, sortField, sortDirection, filterSet
}, callback = fn) => {
  const filters = pickBy(filterSet, identity);
  dispatch($loading(true));
  axios.get(API.logs, {
    params: {
      page,
      sortField,
      sortDirection,
      ...filters
    }
  }).then(({ data }) => {
    dispatch($logsList({
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

export default { $$logsFetch };
