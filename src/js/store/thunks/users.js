import { API } from 'Config';
import axios from 'axios';

import {
  $loading,
  $usersList,
} from 'Store/actions';

import { $$messageSet } from 'Store/thunks/message';
import { $$errorSet } from 'Store/thunks/error';

const fn = () => {};

export const $$usersFetch = (dispatch, page, callback = fn) => {
  dispatch($loading(true));
  axios.get(API.users, {
    params: { page }
  }).then(({ data }) => {
    dispatch($usersList({
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

export const $$userDelete = (dispatch, user, close = fn) => {
  axios.delete(`${API.users}/${user.id}`).then(() => {
    $$usersFetch(dispatch, 1);
    $$messageSet(dispatch, {
      type: 'success',
      text: `The user ${user.fullName} was successfully deleted.`
    });
    close();
  }).catch(err => {
    close();
    $$errorSet(dispatch, err);
  });
};
