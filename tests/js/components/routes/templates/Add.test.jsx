import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import TemplateAdd from 'Components/routes/templates/Add';

describe('Templates Add', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<TemplateAdd />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
