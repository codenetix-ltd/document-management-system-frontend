import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { DocumentVersions } from 'Routes/documents/partials/DocumentVersions';

describe('Documents Versions', () => {
  let wrapper;
  let versions;
  let match;

  beforeEach(() => {
    versions = {
      list: []
    };
    match = {
      params: {
        documentID: 1
      }
    };
    wrapper = shallow(<DocumentVersions
      dispatch={() => {}}
      match={match}
      version={{}}
      versions={versions}
    />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
