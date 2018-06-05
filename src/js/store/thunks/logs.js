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
  page, orderBy, sortedBy, filterSet
}, callback = fn) => {
  const filters = pickBy(filterSet, identity);
  dispatch($loading(true));
  axios.get(API.logs, {
    params: {
      page,
      orderBy,
      sortedBy,
      ...filters
    }
  }).then(({ data }) => {
    dispatch($logsList({
      list: data.data,
      lastPage: data.meta.lastPage,
      page,
      orderBy,
      sortedBy
    }));
    dispatch($loading(false));
    callback(data);
  }).catch(err => {
    dispatch($loading(false));
    $$errorSet(dispatch, err);
  });
};

export default { $$logsFetch };
