import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { DocumentsCompare } from 'Routes/documents/Compare';

import { $$comparedDocumentsFetch } from 'Store/thunks/documents';

jest.mock('Store/thunks/documents', () => ({
  $$comparedDocumentsFetch: jest.fn()
}));

function generateCurrentSet() {
  return [...Array(10)].map((c, i, arr) => {
    if (i === (arr.length - 1)) {
      return {
        attributeValues: [
          { id: 1, type: 'string', value: 'lorem' },
          { id: 2, type: 'string', value: 'ipsum' },
          { id: 3, type: 'integer', value: 20 }
        ]
      };
    }
    return {
      attributeValues: [
        { id: 1, type: 'string', value: 'lorem' },
        { id: 2, type: 'string', value: 'ipsum' },
        { id: 3, type: 'integer', value: 10 }
      ]
    };
  });
}

describe('Documents Compare', () => {
  let props;
  let wrapper;
  let instance;

  beforeEach(() => {
    props = {
      location: {
        search: 'documentIds=1,2,3'
      },
      dispatch: () => {},
      comparedDocuments: []
    };
    wrapper = shallow(<DocumentsCompare {...props} />);
    instance = wrapper.instance();
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should call $$comparedDocumentsFetch in componentDidMount', () => {
    expect($$comparedDocumentsFetch.mock.calls.length).toBe(1);
  });

  it('should change state upon calling onNavClick', () => {
    expect(instance.state).toHaveProperty('activeKey');
    expect(instance.state.activeKey).toBe(0);
    instance.onNavClick(1);
    expect(instance.state.activeKey).toBe(1);
  });

  it('should change state upon calling onFiltersClick', () => {
    expect(instance.state).toHaveProperty('showAll');
    expect(instance.state.showAll).toBe(true);
    instance.onFiltersClick(false);
    expect(instance.state.showAll).toBe(false);
  });

  it('should call valueDiffers method', () => {
    const currentSet = generateCurrentSet(2, false);
    expect(instance.valueDiffers(currentSet, 1)).toBe(false);
    expect(instance.valueDiffers(currentSet, 2)).toBe(false);
    expect(instance.valueDiffers(currentSet, 3)).toBe(true);
  });

  it('should call mergeActualVersion method', () => {
    const comparedDocs = [
      {
        id: 1,
        actualVersion: { id: 22 }
      }
    ];
    const merged = instance.mergeActualVersion(comparedDocs);
    expect(merged[0]).not.toHaveProperty('actualVersion');
    expect(merged[0].id).toBe(1);
  });

  it('should call joinByTemplateID', () => {
    const actualDocs = [
      { template: { id: 1 } },
      { template: { id: 1 } },
      { template: { id: 1 } },
      { template: { id: 2 } },
      { template: { id: 2 } },
      { template: { id: 3 } }
    ];
    const joined = instance.joinByTemplateID(actualDocs);
    expect(joined[0].length).toBe(3);
    expect(joined[0].every(({ template: { id } }) => id === 1)).toBe(true);
    expect(joined[1].length).toBe(2);
    expect(joined[1].every(({ template: { id } }) => id === 2)).toBe(true);
    expect(joined[2].length).toBe(1);
    expect(joined[2].every(({ template: { id } }) => id === 3)).toBe(true);
  });
});
