import { getURL } from 'Config';
import axios from 'Services/request';

import {
  $loading,
  $attributesList,
  $attribute,
  $updateAttribute
} from 'Store/actions';

import { $$errorSet } from 'Store/thunks/error';

import initialState from 'Store/reducers/initialState.json';

const fn = () => {};

export const $$attributesFetch = (dispatch, templateID, tableComponent, callback = fn) => {
  const url = getURL('attributes', templateID);
  const tableComp = {
    props: { templateID },
    onAttributeDelete: tableComponent.onAttributeDelete
  };
  axios.get(url).then(({ data }) => {
    const list = data.data.map(item => {
      return {
        ...item,
        tableComp
      };
    });
    dispatch($attributesList({ list }));
    callback(list);
  }).catch(err => {
    $$errorSet(dispatch, err);
  });
};

export const $$attributeFetch = (dispatch, templateID, attributeID, callback = fn) => {
  dispatch($loading(true));
  const url = getURL('attributes', templateID);
  axios.get(`${url}/${attributeID}`).then(({ data }) => {
    dispatch($attribute({ ...data }));
    dispatch($loading(false));
    callback(data);
  }).catch(err => {
    dispatch($loading(false));
    $$errorSet(dispatch, err);
  });
};

export const $$attributeUpdate = (dispatch, part) => {
  dispatch($updateAttribute(part));
};

export const $$attributeReset = (dispatch) => {
  dispatch($attribute(initialState.attribute));
};
