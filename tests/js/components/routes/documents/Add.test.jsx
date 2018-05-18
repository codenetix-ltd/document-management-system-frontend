import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import DocumentAdd from 'Routes/documents/Add';

describe('Documents Add', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<DocumentAdd />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
