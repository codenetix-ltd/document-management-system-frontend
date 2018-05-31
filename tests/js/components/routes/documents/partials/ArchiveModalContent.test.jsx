import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { ArchiveModalContent } from 'Routes/documents/partials/ArchiveModalContent';

import { $substituteDocument } from 'Store/actions';

jest.mock('Store/actions', () => ({
  $substituteDocument: jest.fn()
}));

describe('Documents ArchiveModalContent', () => {
  let wrapper;
  let props;
  let instance;

  beforeEach(() => {
    props = {
      dispatch: () => {},
      documents: {
        list: []
      },
      selectedDocuments: [],
      substituteDocument: {}
    };
    wrapper = shallow(<ArchiveModalContent {...props} />);
    instance = wrapper.instance();
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should call $substituteDocument upon calling onChange', () => {
    instance.onChange('test');
    expect($substituteDocument).toBeCalled();
    expect($substituteDocument).toBeCalledWith('test');
    expect($substituteDocument.mock.calls.length).toBe(1);
  });
});
