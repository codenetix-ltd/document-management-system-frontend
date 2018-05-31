import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { DocumentVersions } from 'Routes/documents/partials/DocumentVersions';

import {
  $$versionsFetch,
  $$versionFetch
} from 'Store/thunks/versions';

jest.mock('Store/thunks/versions', () => ({
  $$versionsFetch: jest.fn(),
  $$versionFetch: jest.fn()
}));

describe('Documents Versions', () => {
  let wrapper;
  let props;
  let instance;

  beforeEach(() => {
    props = {
      dispatch: () => {},
      version: {},
      versions: {
        list: []
      },
      match: {
        params: {
          documentID: 1
        }
      }
    };
    wrapper = shallow(<DocumentVersions {...props} />);
    instance = wrapper.instance();
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should call $$versionsFetch on componentDidMount', () => {
    expect($$versionsFetch).toHaveBeenCalledTimes(1);
  });

  it('should call $$versionFetch when calling onViewClick', () => {
    expect($$versionFetch).not.toHaveBeenCalled();
    instance.onViewClick(1);
    expect($$versionFetch).toHaveBeenCalledTimes(1);
  });

  it('should change state when calling onModalClose', () => {
    expect(instance.state).toHaveProperty('open');
    expect(instance.state.open).toBe(false);
    wrapper.setState({ open: true });
    expect(instance.state.open).toBe(true);
    instance.onModalClose();
    expect(instance.state.open).toBe(false);
  });

  it('should call sortDesc method', () => {
    const arr = [
      { id: 1 },
      { id: 2 },
      { id: 3 }
    ];
    arr.sort(instance.sortDesc);
    expect(arr[0].id).toBe(3);
  });
});
