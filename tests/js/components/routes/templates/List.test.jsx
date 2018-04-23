import _ from 'lodash';
import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import List from 'Components/routes/templates/List';

describe('Templates list', () => {
  it('should render correctly', () => {
    const output = shallow(<List />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should check if onFetchData method exists', () => {
    const wrapper = shallow(<List />);
    const { onFetchData } = wrapper.instance();
    expect(_.isFunction(onFetchData)).toBe(true);
  });

  it('should check if onFetchData method has been called', () => {
    const spy = jest.spyOn(List.prototype, 'onFetchData');
    const wrapper = shallow(<List />);
    wrapper.instance().onFetchData({ page: 0 });
    expect(spy).toHaveBeenCalled();
  });

  it('should check if data is populated', () => {
    const wrapper = shallow(<List />);
    let { data } = wrapper.state();
    expect(data.length).toEqual(0);
    wrapper.instance().onFetchData({ page: 0 });
    setTimeout(() => {
      data = wrapper.state();
      expect(data.length).toBeGreaterThan(0);
    }, 1);
  });
});
