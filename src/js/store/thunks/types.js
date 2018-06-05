import { API } from 'Config';
import axios from 'Services/request';

import {
  $loading,
  $typesList
} from 'Store/actions';

import { $$errorSet } from 'Store/thunks/error';

const fn = () => {};

export const $$typesFetch = (dispatch, callback = fn) => {
  dispatch($loading(true));
  axios.get(API.types).then(({ data }) => {
    dispatch($typesList(data));
    dispatch($loading(false));
    callback(data);
  }).catch(err => {
    dispatch($loading(false));
    $$errorSet(dispatch, err);
  });
};

export default { $$typesFetch };
