/* global jest, describe, it, beforeEach, expect */
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import UserDetailsContainer from '../Containers/UserDetailsContainer';
import UserDetails from '../Components/UserDetails';
import Spin from 'antd/lib/spin/index';
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
const MOCKUSER = {
  user: {
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
  }
};

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

describe('UserDetailsContainer', function () {
  it('renders successfully when data is passed via link', function () {
    const wrapper = shallow(<UserDetailsContainer location={{ state: MOCKUSER }} match={{ params: { userId: 1 } }}/>);
    expect(wrapper.find(UserDetails)).toHaveLength(1);
  });
  it('shows spinner when state is loading', function () {
    const wrapper = shallow(<UserDetailsContainer location={{ state: MOCKUSER }} match={{ params: { userId: 1 } }}/>);
    wrapper.setState({ isLoading: true });
    expect(wrapper.find(UserDetails)).toHaveLength(0);
    expect(wrapper.find(Spin)).toHaveLength(1);
  });
  it('renders empty state when no data is passsed and fetch does not return', function () {
    givenFetchReturns([]);
    const wrapper = shallow(<UserDetailsContainer location={{ state: undefined }} match={{ params: { userId: 1 } }}/>);
    setImmediate(() => {
      expect(wrapper.find(UserDetails)).toHaveLength(0);
      expect(wrapper.contains(<h3 className="empty-message">No user found. Please return to the user list and select a
        valid user.</h3>)).toEqual(true);
    });
  });
  it('uses path props when available and does not fetch', function () {
    givenFetchReturns(MOCKDATA);
    const wrapper = shallow(<UserDetailsContainer location={{ state: MOCKUSER }} match={{ params: { userId: 1 } }}/>);
    expect(window.fetch).toHaveBeenCalledTimes(0);
    expect(wrapper.find(UserDetails)).toHaveLength(1);
  });
  it('fetchs data when path props are unavailable', function () {
    givenFetchReturns(MOCKDATA);
    const wrapper = shallow(<UserDetailsContainer location={{ state: undefined }} match={{ params: { userId: 1 } }}/>);
    setImmediate(() => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(wrapper.find(UserDetails)).toHaveLength(1);
    });
  });
  it('handles fetch failure', function () {
    givenFetchFails();
    const wrapper = shallow(<UserDetailsContainer location={{ state: undefined }} match={{ params: { userId: 1 } }}/>);
    setImmediate(() => {
      expect(wrapper.find(UserDetails)).toHaveLength(0);
      expect(wrapper.contains(<h3 className="empty-message">No user found. Please return to the user list and select a
        valid user.</h3>)).toEqual(true);
    });
  });
});
