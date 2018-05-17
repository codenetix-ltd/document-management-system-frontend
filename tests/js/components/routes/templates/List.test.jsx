import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { TemplatesList } from 'Components/routes/templates/List';

describe('Templates list', () => {
  let wrapper;
  let templates;

  beforeEach(() => {
    templates = {
      list: []
    };
    wrapper = shallow(<TemplatesList
      templates={templates}
      loading={false}
      dispatch={() => {}}
    />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
