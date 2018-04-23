import { $error } from 'Store/actions';

export const $$errorSet = (dispatch, { name, message }) => {
  dispatch($error({ name, message }));
};

export const $$errorClear = (dispatch) => {
  dispatch($error({
    name: '',
    message: ''
  }));
};
