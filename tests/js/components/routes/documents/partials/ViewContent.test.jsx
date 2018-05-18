import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ViewContent from 'Routes/documents/partials/ViewContent';

describe('Documents ViewContent', () => {
  let wrapper;
  let document;

  beforeEach(() => {
    document = {
      actualVersion: {}
    };
    wrapper = shallow(<ViewContent document={document} />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
