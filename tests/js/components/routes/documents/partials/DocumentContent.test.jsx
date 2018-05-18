import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { DocumentContent } from 'Routes/documents/partials/DocumentContent';

describe('Documents Add', () => {
  let wrapper;
  let match;
  let document;

  beforeEach(() => {
    match = {
      params: {
        documentID: 1
      }
    };
    document = {
      actualVersion: {}
    };
    wrapper = shallow(<DocumentContent document={document} match={match} />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
