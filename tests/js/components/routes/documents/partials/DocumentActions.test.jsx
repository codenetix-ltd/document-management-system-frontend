import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { DocumentActions } from 'Routes/documents/partials/DocumentActions';

describe('Documents Actions', () => {
  let wrapper;
  let props;
  let promptShowSpy;
  let instance;

  beforeEach(() => {
    promptShowSpy = jest.fn();
    props = {
      dispatch: () => {},
      selectedDocuments: [
        { id: 1 },
        { id: 2 }
      ],
      substituteDocument: {},
      prompt: {
        show: promptShowSpy
      }
    };
    wrapper = shallow(<DocumentActions {...props} />);
    instance = wrapper.instance();
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should call prompt.show in onMassArchive', () => {
    instance.onMassArchive();
    expect(promptShowSpy.mock.calls.length).toBe(1);
  });

  it('should call prompt.show in onMassDelete', () => {
    instance.onMassDelete();
    expect(promptShowSpy.mock.calls.length).toBe(1);
  });

  it('should change state upon calling onCompare', () => {
    expect(instance.state).toHaveProperty('compareURL');
    expect(instance.state.compareURL).toBe('');
    instance.onCompare();
    expect(instance.state.compareURL).toContain('1,2');
  });
});
