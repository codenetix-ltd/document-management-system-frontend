import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { AttributesForm } from 'Routes/documents/partials/AttributesForm';

describe('Documents AttributesForm', () => {
  let wrapper;
  let document;

  beforeEach(() => {
    document = {
      actualVersion: {
        template: {
          attributes: []
        }
      }
    };
    wrapper = shallow(<AttributesForm dispatch={() => {}} document={document} />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
