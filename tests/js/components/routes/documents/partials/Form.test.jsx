import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { DocumentForm } from 'Routes/documents/partials/Form';

import {
  $$documentUpdate,
  $$documentReset
} from 'Store/thunks/documents';
import { $$labelsFetch } from 'Store/thunks/labels';
import { $$templatesFetch } from 'Store/thunks/templates';

jest.mock('Store/thunks/documents', () => ({
  $$documentReset: jest.fn(),
  $$documentUpdate: jest.fn()
}));

jest.mock('Store/thunks/labels', () => ({
  $$labelsFetch: jest.fn()
}));

jest.mock('Store/thunks/templates', () => ({
  $$templatesFetch: jest.fn()
}));

describe('Documents Form', () => {
  let wrapper;
  let props;
  let instance;

  beforeEach(() => {
    props = {
      dispatch: () => {},
      document: {
        actualVersion: {
          template: {
            attributes: []
          }
        }
      },
      profile: {},
      templates: {
        list: []
      },
      labels: {
        list: []
      }
    };
    wrapper = shallow(<DocumentForm {...props} />);
    instance = wrapper.instance();
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should call $$documentReset on componentWillUnmount', () => {
    expect($$documentReset).not.toHaveBeenCalled();
    wrapper.unmount();
    expect($$documentReset).toHaveBeenCalledTimes(1);
  });

  it('should call $$labelsFetch when calling getLabelOptions', () => {
    expect($$labelsFetch).not.toHaveBeenCalled();
    instance.getLabelOptions('', () => {});
    expect($$labelsFetch).toHaveBeenCalledTimes(1);
  });

  it('should call $$templatesFetch when calling getLabelOptions', () => {
    expect($$templatesFetch).not.toHaveBeenCalled();
    instance.getTemplateOptions('', () => {});
    expect($$templatesFetch).toHaveBeenCalledTimes(1);
  });

  it('calls getEmptyOptions method', () => {
    const callback = jest.fn();
    expect(callback).not.toHaveBeenCalled();
    instance.getEmptyOptions('', callback);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toBeCalledWith(null, { options: [] });
  });

  it('should call $$documentUpdate in handleChange', () => {
    expect($$documentUpdate).not.toHaveBeenCalled();
    instance.handleChange({
      target: {
        name: 'lorem',
        value: 'ipsum',
        dataset: {
          field: ''
        }
      }
    });
    expect($$documentUpdate).toHaveBeenCalledTimes(1);
    expect($$documentUpdate).toBeCalledWith(props.dispatch, { lorem: 'ipsum' });
  });

  it('should call $$documentUpdate in handleLabelsSelect', () => {
    const value = 'test';
    expect($$documentUpdate).not.toHaveBeenCalled();
    instance.handleLabelsSelect(value);
    expect($$documentUpdate).toHaveBeenCalledTimes(1);
    expect($$documentUpdate).toBeCalledWith(props.dispatch, { labels: value });
  });

  it('should call $$documentUpdate in handleTemplateSelect', () => {
    const value = 'test';
    expect($$documentUpdate).not.toHaveBeenCalled();
    instance.handleTemplateSelect(value);
    expect($$documentUpdate).toHaveBeenCalledTimes(1);
    expect($$documentUpdate).toBeCalledWith(props.dispatch, { template: value });
  });

  it('should call $$documentUpdate in handleFileUpload', () => {
    const fileIds = [1, 2, 3];
    expect($$documentUpdate).not.toHaveBeenCalled();
    instance.handleFileUpload(fileIds);
    expect($$documentUpdate).toHaveBeenCalledTimes(1);
    expect($$documentUpdate).toBeCalledWith(props.dispatch, { fileIds });
  });
});
