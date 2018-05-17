import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import UserEdit from 'Components/routes/users/Edit';

describe('User edit', () => {
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
});
