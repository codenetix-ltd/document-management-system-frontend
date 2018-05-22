import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { DocumentsCompare } from 'Routes/documents/Compare';

describe('Documents Compare', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      location: {
        search: 'documentIds=1,2,3'
      },
      dispatch: () => {},
      comparedDocuments: []
    };
    wrapper = shallow(<DocumentsCompare {...props} />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
