import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { DocumentsList as List } from 'Components/routes/documents/List';

describe('Documents list', () => {
  let spy;
  let props;
  let onSelectSpy;
  let onFetchDataSpy;
  let onArchiveSpy;
  let onDeleteSpy;
  let clearSelectionSpy;
  let wrapper;
  let instance;

  beforeEach(() => {
    spy = jest.fn();
    props = {
      documents: { list: [] },
      dispatch: spy,
      loading: false
    };
    onSelectSpy = jest.spyOn(List.prototype, 'onSelect');
    onFetchDataSpy = jest.spyOn(List.prototype, 'onFetchData');
    onArchiveSpy = jest.spyOn(List.prototype, 'onArchive');
    onDeleteSpy = jest.spyOn(List.prototype, 'onDelete');
    clearSelectionSpy = jest.spyOn(List.prototype, 'clearSelection');
    wrapper = shallow(<List {...props} />);
    instance = wrapper.instance();
    instance.prompt = {
      show: () => {}
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should call componentWillUnmount', () => {
    const { componentWillUnmount } = List.prototype;
    class ExtendedList extends List {
      componentWillUnmount = componentWillUnmount;
      render() {
        return <List {...props} />;
      }
    }
    const list = shallow(<ExtendedList {...props} />);
    list.unmount();
    expect(clearSelectionSpy.mock.calls.length).toBe(1);
  });

  it('should call clearSelection', () => {
    instance.clearSelection();
    expect(clearSelectionSpy.mock.calls.length).toBe(1);
  });

  it('should call onFetchData', () => {
    instance.onFetchData({
      page: 1,
      sorted: [{ id: 1, desc: true }]
    });
    expect(onFetchDataSpy.mock.calls.length).toBe(1);
  });

  it('should call onArchive', () => {
    instance.onArchive({
      value: {
        actualVersion: {}
      }
    });
    expect(onArchiveSpy.mock.calls.length).toBe(1);
  });

  it('should call onDelete', () => {
    instance.onDelete({
      value: {
        actualVersion: {}
      }
    });
    expect(onDeleteSpy.mock.calls.length).toBe(1);
  });

  it('should call onSelect', () => {
    instance.onSelect();
    expect(onSelectSpy.mock.calls.length).toBe(1);
  });
});
