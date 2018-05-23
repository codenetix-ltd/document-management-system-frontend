import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { DocumentView } from 'Routes/documents/View';

import {
  $$documentFetch,
  $$documentReset
} from 'Store/thunks/documents';

jest.mock('Store/thunks/documents', () => ({
  $$documentFetch: jest.fn(),
  $$documentReset: jest.fn()
}));

describe('Documents View', () => {
  let wrapper;
  let props;
  let instance;

  beforeEach(() => {
    props = {
      match: {
        params: {
          documentID: 1
        }
      },
      document: {
        actualVersion: {}
      },
      dispatch: () => {}
    };
    wrapper = shallow(<DocumentView {...props} />);
    instance = wrapper.instance();
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should call $$documentFetch in componentDidMount', () => {
    expect($$documentFetch.mock.calls.length).toBe(1);
  });

  it('should call $$documentReset in componentWillUnmount', () => {
    wrapper.unmount();
    expect($$documentReset.mock.calls.length).toBe(1);
  });

  it('should change state upon calling onTabSelect', () => {
    expect(instance.state).toHaveProperty('activeKey');
    expect(instance.state.activeKey).toBe(1);
    instance.onTabSelect(2);
    expect(instance.state.activeKey).toBe(2);
  });
});
