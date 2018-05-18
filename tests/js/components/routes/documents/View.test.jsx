import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { DocumentView } from 'Components/routes/documents/View';

describe('Documents View', () => {
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
    wrapper = shallow(<DocumentView dispatch={() => {}} match={match} document={document} />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
