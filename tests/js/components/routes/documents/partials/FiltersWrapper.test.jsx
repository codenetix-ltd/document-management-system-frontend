import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { FiltersWrapper } from 'Routes/documents/partials/FiltersWrapper';

import { $$templatesFetch } from 'Store/thunks/templates';
import { $$documentsFetch } from 'Store/thunks/documents';

jest.mock('Store/thunks/templates', () => ({
  $$templatesFetch: jest.fn()
}));

jest.mock('Store/thunks/documents', () => ({
  $$documentsFetch: jest.fn()
}));

describe('Documents FiltersWrapper', () => {
  let wrapper;
  let props;
  let instance;
  let dispatch;

  beforeEach(() => {
    dispatch = jest.fn();
    props = {
      dispatch,
      documents: {
        list: []
      },
      templates: {
        list: []
      },
      labels: {
        list: []
      }
    };
    wrapper = shallow(<FiltersWrapper {...props} />);
    instance = wrapper.instance();
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should call $$templatesFetch on componentDidMount', () => {
    expect($$templatesFetch.mock.calls.length).toBe(1);
  });

  it('should change templateOptions state on componentWillReceiveProps', () => {
    const nextProps = {
      templates: {
        list: [
          { id: 1, name: 'Lorem' },
          { id: 2, name: 'Ipsum' }
        ]
      }
    };
    expect(instance.state).toHaveProperty('templateOptions');
    expect(instance.state.templateOptions).toBeInstanceOf(Array);
    expect(instance.state.templateOptions.length).toBe(0);
    wrapper.setProps(nextProps, () => {
      expect(instance.state.templateOptions.length).toBe(2);
    });
  });

  it('should change labelOptions state on componentWillReceiveProps', () => {
    const nextProps = {
      labels: {
        list: [
          { id: 1, name: 'Lorem' },
          { id: 2, name: 'Ipsum' }
        ]
      }
    };
    expect(instance.state).toHaveProperty('labelOptions');
    expect(instance.state.labelOptions).toBeInstanceOf(Array);
    expect(instance.state.labelOptions.length).toBe(0);
    wrapper.setProps(nextProps, () => {
      expect(instance.state.labelOptions.length).toBe(2);
    });
  });

  it('should call dispatch when calling onFilterChange', () => {
    expect(dispatch).not.toBeCalled();
    instance.onFilterChange('name', 'Lorem ipsum');
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  it('should call $$documentsFetch when calling onFilterChange', () => {
    expect($$documentsFetch).not.toBeCalled();
    instance.onFilterChange('name', 'Lorem ipsum');
    setTimeout(() => {
      expect($$documentsFetch).toHaveBeenCalledTimes(1);
    }, 100);
  });
});
