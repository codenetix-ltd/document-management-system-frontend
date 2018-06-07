import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { DocumentContent } from 'Routes/documents/partials/DocumentContent';

import axios from 'Services/request';

jest.mock('Services/request', () => ({
  put: jest.fn()
}));

describe('Documents DocumentContent', () => {
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
      profile: {
        id: 1
      }
    };
    wrapper = shallow(<DocumentContent {...props} />);
    instance = wrapper.instance();
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should call axios.put in onFormSubmit', () => {
    axios.put.mockResolvedValue({});
    instance.onFormSubmit();
    expect(axios.put.mock.calls.length).toBe(1);
  });
});
