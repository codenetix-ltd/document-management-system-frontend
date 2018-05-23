import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { DocumentsList as List } from 'Components/routes/documents/List';

import { $$documentsFetch } from 'Store/thunks/documents';

jest.mock('Store/thunks/documents', () => ({
  $$documentsFetch: jest.fn()
}));

describe('Documents list', () => {
  let dispatchSpy;
  let props;
  let clearSelectionSpy;
  let wrapper;
  let instance;
  let promptShowSpy;

  beforeEach(() => {
    dispatchSpy = jest.fn();
    props = {
      dispatch: dispatchSpy,
      loading: false,
      documents: { list: [] }
    };
    clearSelectionSpy = jest.spyOn(List.prototype, 'clearSelection');
    wrapper = shallow(<List {...props} />);
    instance = wrapper.instance();
    instance.prompt = {
      show: () => {}
    };
    promptShowSpy = jest.spyOn(instance.prompt, 'show');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should call clearSelection in componentWillUnmount', () => {
    wrapper.unmount();
    expect(clearSelectionSpy.mock.calls.length).toBe(1);
  });

  it('should call $$documentsFetch in onFetchData', () => {
    instance.onFetchData({
      page: 1,
      sorted: [{ id: 1, desc: true }]
    });
    expect($$documentsFetch.mock.calls.length).toBe(1);
  });

  it('should call prompt.show in onArchive', () => {
    instance.onArchive({
      value: {
        actualVersion: {}
      }
    });
    expect(promptShowSpy.mock.calls.length).toBe(1);
  });

  it('should call prompt.show in onDelete', () => {
    instance.onDelete({
      value: {
        actualVersion: {}
      }
    });
    expect(promptShowSpy.mock.calls.length).toBe(1);
  });

  it('should call dispatch in onSelect', () => {
    instance.onSelect([]);
    expect(dispatchSpy.mock.calls.length).toBe(1);
  });
});
