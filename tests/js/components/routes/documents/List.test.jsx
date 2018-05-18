import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { DocumentsList as List } from 'Components/routes/documents/List';

describe('Documents list', () => {
  let wrapper;
  let documents;

  beforeEach(() => {
    documents = {
      list: []
    };
    wrapper = shallow(<List documents={documents} dispatch={() => {}} loading={false} />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
