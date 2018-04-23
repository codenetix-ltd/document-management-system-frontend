import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { UsersList as List } from 'Components/routes/users/List';

describe('Users list', () => {
  let wrapper;
  List.prototype.onFetchData = () => {};

  beforeEach(() => {
    wrapper = shallow(<List users={{}} dispatch={() => {}} loading={false} />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
