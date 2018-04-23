import { $message } from 'Store/actions';

export const $$messageSet = (dispatch, data) => {
  dispatch($message(data));
};

export const $$messageClear = (dispatch) => {
  dispatch($message({
    text: '',
    type: 'success'
  }));
};
