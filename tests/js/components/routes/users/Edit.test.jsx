import _ from 'lodash';
import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import UserEdit from 'Components/routes/users/Edit';

describe('Users list', () => {
  let wrapper;
  let match;

  beforeEach(() => {
    match = {
      params: {
        userID: 1
      }
    };
    wrapper = shallow(<UserEdit match={match} />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should check if user data has been loaded', () => {
    const { user } = wrapper.state();
    expect(_.isEmpty(user)).toBe(true);
    setTimeout(() => {
      const { loadedUser } = wrapper.state();
      expect(_.isEmpty(loadedUser)).toBe(false);
    }, 1000);
  });

  it('should check if user full_name is not empty', () => {
    setTimeout(() => {
      const { loadedUser } = wrapper.state();
      expect(_.isEmpty(loadedUser.full_name)).toBe(false);
    }, 1000);
  });
});
