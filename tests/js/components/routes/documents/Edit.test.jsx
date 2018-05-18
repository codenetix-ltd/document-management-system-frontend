import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { DocumentEdit } from 'Components/routes/documents/Edit';

describe('Documents Edit', () => {
  let wrapper;
  let match;
  let document;

  beforeEach(() => {
    match = {
      params: {
        userID: 1
      }
    };
    document = {
      actualVersion: {}
    };
    wrapper = shallow(<DocumentEdit match={match} dispatch={() => {}} document={document} />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
