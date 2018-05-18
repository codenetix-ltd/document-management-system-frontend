import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { DocumentActions } from 'Routes/documents/partials/DocumentActions';

describe('Documents Actions', () => {
  let wrapper;
  let substDoc;
  let prompt;

  beforeEach(() => {
    substDoc = {};
    prompt = {};
    wrapper = shallow(<DocumentActions
      dispatch={() => {}}
      selectedDocuments={[]}
      substituteDocument={substDoc}
      prompt={prompt}
    />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
