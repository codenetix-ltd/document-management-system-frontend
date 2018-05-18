import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { ArchiveModalContent } from 'Routes/documents/partials/ArchiveModalContent';

describe('Documents ArchiveModalContent', () => {
  let wrapper;
  let documents;
  let subsDoc;

  beforeEach(() => {
    subsDoc = {};
    documents = {
      list: []
    };
    wrapper = shallow(<ArchiveModalContent
      dispatch={() => {}}
      documents={documents}
      selectedDocuments={[]}
      substituteDocument={subsDoc}
    />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
