import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { DocumentsCompare } from 'Routes/documents/Compare';

import { $$comparedDocumentsFetch } from 'Store/thunks/documents';

jest.mock('Store/thunks/documents', () => ({
  $$comparedDocumentsFetch: jest.fn()
}));

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

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should call $$comparedDocumentsFetch in componentDidMount', () => {
    expect($$comparedDocumentsFetch.mock.calls.length).toBe(1);
  });
});
