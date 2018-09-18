/* global jest, describe, it, beforeEach, expect */
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Spin from 'antd/lib/spin';

import UserListContainer from '../Containers/UserListContainer';
import UserList from '../Components/UserList';

configure({ adapter: new Adapter() });

const MOCKDATA = [ {
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
}, {
  address: {
    street: '404 Not Found Way',
    suite: '60',
    city: 'Durham',
    zipcode: '12345',
    geo: { lat: '20', lng: '20' }
  },
  company: {
    name: 'Loft Building',
    catchPhrase: 'builds the best lofts',
    bs: 'bs'
  },
  email: 'anna@yahoo.com',
  id: 2,
  name: 'Anna Taylor',
  phone: '123-456-7890',
  username: 'annataylor',
  website: 'taylor.com'
} ];

function givenFetchReturns(data) {
  window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
    ok: true,
    json: () => data
  }));
}

function givenFetchFails() {
  window.fetch = jest.fn().mockImplementation(() => Promise.reject());
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe('UserListContainer', function () {
  it('renders successfully', function () {
    givenFetchReturns(MOCKDATA);
    const wrapper = shallow(<UserListContainer/>);
    setImmediate(() => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(wrapper.find(UserList)).toHaveLength(1);
    });
  });
  it('shows spinner when state is loading', function () {
    const wrapper = shallow(<UserListContainer/>);
    wrapper.setState({ isLoading: true });
    expect(wrapper.find(UserList)).toHaveLength(0);
    expect(wrapper.find(Spin)).toHaveLength(1);
  });
  it('renders empty state when fetch does not return', function () {
    givenFetchReturns([]);
    const wrapper = shallow(<UserListContainer/>);
    setImmediate(() => {
      expect(wrapper.find(UserList)).toHaveLength(0);
      expect(wrapper.contains(<h3 className="user-list-message-padding empty-message">No users found. Please check the
        server status.</h3>)).toEqual(true);
    });
  });
  it('handles fetch failure', function () {
    givenFetchFails();
    const wrapper = shallow(<UserListContainer/>);
    setImmediate(() => {
      expect(wrapper.find(UserList)).toHaveLength(0);
      expect(wrapper.contains(<h3 className="user-list-message-padding empty-message">No users found. Please check the
        server status.</h3>)).toEqual(true);
    });
  });
});
