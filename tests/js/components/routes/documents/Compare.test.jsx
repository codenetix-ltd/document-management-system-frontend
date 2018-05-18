import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { DocumentsCompare } from 'Routes/documents/Compare';

describe('Documents Compare', () => {
  let wrapper;
  let location;
  let comparedDocuments;

  beforeEach(() => {
    location = {
      search: 'documentIds=1,2,3'
    };
    comparedDocuments = [];
    wrapper = shallow(<DocumentsCompare
      dispatch={() => {}}
      comparedDocuments={comparedDocuments}
      location={location}
    />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
