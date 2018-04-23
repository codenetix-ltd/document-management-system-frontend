import { API } from 'Config';
import axios from 'Services/request';

import {
  $loading,
  $typesList
} from 'Store/actions';

import { $$errorSet } from 'Store/thunks/error';

const fn = () => {};

export const $$typesFetch = (dispatch, page, callback = fn) => {
  dispatch($loading(true));
  axios.get(API.types, {
    params: { page }
  }).then(({ data }) => {
    dispatch($typesList({
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

export default { $$typesFetch };
