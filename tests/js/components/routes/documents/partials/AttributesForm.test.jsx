import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { AttributesForm } from 'Routes/documents/partials/AttributesForm';

import { $updateAttributeValues } from 'Store/actions';

jest.mock('Store/actions', () => ({
  $updateAttributeValues: jest.fn()
}));

describe('Documents AttributesForm', () => {
  let wrapper;
  let props;
  let instance;

  beforeEach(() => {
    props = {
      dispatch: () => {},
      document: {
        actualVersion: {
          attributeValues: [],
          template: {
            attributes: []
          }
        }
      },
      types: [{ id: 1, name: 'String', machineName: 'string' }]
    };
    wrapper = shallow(<AttributesForm {...props} />);
    instance = wrapper.instance();
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should call $updateAttributeValues upon calling onAttrChange', () => {
    instance.onAttrChange(
      {
        target: {
          value: ''
        }
      }, {
        id: 1,
        typeId: 1
      }
    );
    expect($updateAttributeValues.mock.calls.length).toBe(1);
  });

  it('should call $updateAttributeValues upon calling onCheckboxToggle', () => {
    instance.onCheckboxToggle(
      {
        target: {
          value: ''
        }
      }, {
        id: 1,
        typeId: 1
      }
    );
    expect($updateAttributeValues.mock.calls.length).toBe(1);
  });
});
