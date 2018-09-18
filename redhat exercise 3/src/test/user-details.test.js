/* global jest, describe, it, expect, beforeEach */
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import UserDetails from '../Components/UserDetails';

configure({ adapter: new Adapter() });

const MOCKUSER = {
  address: {
    street: '123 Test Drive',
    suite: '#303',
    city: 'Raleigh',
    zipcode: '27508',
    geo: { lat: '100', lng: '100' }
  },
  company: {
    name: 'Testing Works',
    catchPhrase: 'best testing',
    bs: 'bs'
  },
  email: 'test@gmail.com',
  id: 1,
  name: 'John Smith',
  phone: '202-263-2632',
  username: 'jsmith',
  website: 'jsmith.co'
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('UserDetails', function () {
  it('successfully renders details passed via props', function () {
    const wrapper = shallow(<UserDetails user={MOCKUSER}/>);
    expect(wrapper.find('.user-details')).toHaveLength(1);
    expect(wrapper.contains(<h2>John Smith <small>(username: jsmith)</small></h2>)).toEqual(true);
  });
});
