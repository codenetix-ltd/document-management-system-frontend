import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { DocumentsList as List } from 'Components/routes/documents/List';

describe('Documents list', () => {
  let documents;
  let spy;
  let onSelectSpy;
  let onFetchDataSpy;
  let onArchiveSpy;
  let onDeleteSpy;
  let wrapper;
  let instance;

  beforeEach(() => {
    documents = { list: [] };
    spy = jest.fn();
    onSelectSpy = jest.spyOn(List.prototype, 'onSelect');
    onFetchDataSpy = jest.spyOn(List.prototype, 'onFetchData');
    onArchiveSpy = jest.spyOn(List.prototype, 'onArchive');
    onDeleteSpy = jest.spyOn(List.prototype, 'onDelete');
    wrapper = shallow(<List documents={documents} dispatch={spy} loading={false} />);
    instance = wrapper.instance();
    instance.prompt = {
      show: () => {}
    };
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should call onFetchData', () => {
    instance.onFetchData({
      page: 1,
      sorted: [{ id: 1, desc: true }]
    });
    expect(onFetchDataSpy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });

  it('should call onArchive', () => {
    instance.onArchive({
      value: {
        actualVersion: {}
      }
    });
    expect(onArchiveSpy).toHaveBeenCalled();
  });

  it('should call onArchive', () => {
    instance.onDelete({
      value: {
        actualVersion: {}
      }
    });
    expect(onDeleteSpy).toHaveBeenCalled();
  });

  it('should call onSelect', () => {
    instance.onSelect();
    expect(onSelectSpy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });
});
