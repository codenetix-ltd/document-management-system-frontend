import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { FiltersWrapper } from 'Routes/documents/partials/FiltersWrapper';

describe('Documents FiltersWrapper', () => {
  let wrapper;
  let documents;
  let templates;
  let labels;

  beforeEach(() => {
    documents = {
      list: []
    };
    templates = {
      list: []
    };
    labels = {
      list: []
    };
    wrapper = shallow(<FiltersWrapper
      dispatch={() => {}}
      documents={documents}
      templates={templates}
      labels={labels}
    />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
