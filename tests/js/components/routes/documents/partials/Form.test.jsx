import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { DocumentForm } from 'Routes/documents/partials/Form';

describe('Documents Form', () => {
  let wrapper;
  let document;
  let profile;
  let templates;
  let labels;

  beforeEach(() => {
    document = {
      actualVersion: {
        template: {
          attributes: []
        }
      }
    };
    profile = {};
    templates = {
      list: []
    };
    labels = {
      list: []
    };
    wrapper = shallow(<DocumentForm
      labels={labels}
      templates={templates}
      dispatch={() => {}}
      document={document}
      profile={profile}
    />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
