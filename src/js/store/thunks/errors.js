import {
  $errors,
  $updateErrors
} from 'Store/actions';

import initialState from 'Store/reducers/initialState.json';

export const $$errorsSet = (dispatch, data) => {
  dispatch($errors(data));
};

export const $$errorsUpdate = (dispatch, part) => {
  dispatch($updateErrors(part));
};

export const $$errorsReset = (dispatch) => {
  dispatch($errors(initialState.errors));
};
