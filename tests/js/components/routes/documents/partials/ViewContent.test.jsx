import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ViewContent from 'Routes/documents/partials/ViewContent';

describe('Documents ViewContent', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      document: {
        actualVersion: {}
      }
    };
    wrapper = shallow(<ViewContent {...props} />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
