import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { DocumentEdit } from 'Routes/documents/Edit';

import { $$documentFetch } from 'Store/thunks/documents';

jest.mock('Store/thunks/documents', () => ({
  $$documentFetch: jest.fn()
}));

describe('Documents Edit', () => {
  let wrapper;
  let match;
  let props;
  let instance;

  beforeEach(() => {
    match = {
      params: {
        documentID: 1
      }
    };
    props = {
      match,
      dispatch: () => {},
      document: {
        actualVersion: {}
      }
    };
    wrapper = shallow(<DocumentEdit {...props} />);
    instance = wrapper.instance();
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should call $$documentFetch in componentDidMount', () => {
    expect($$documentFetch.mock.calls.length).toBe(1);
  });

  it('should change state upon calling onTabSelect', () => {
    expect(instance.state).toHaveProperty('activeKey');
    expect(instance.state.activeKey).toBe(1);
    instance.onTabSelect(2);
    expect(instance.state.activeKey).toBe(2);
  });

  it('should call validate method', () => {
    const doc = {
      name: ''
    };
    expect(instance.validate(doc)).toBe(false);
    doc.name = 'Lorem ipsum';
    expect(instance.validate(doc)).toBe(true);
  });
});
