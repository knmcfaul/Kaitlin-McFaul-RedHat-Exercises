/* global jest, describe, it, expect */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import App from '../App';
import UserListContainer from "../Containers/UserListContainer";
import UserDetailsContainer from '../Containers/UserDetailsContainer';

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
  UserListContainer.getData = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data
    })
  );
}

describe('App', function () {
  it('renders successfully', function () {
    const wrapper = shallow(<App/>);
    const welcome = <h2>Users Sample Project</h2>;
    expect(wrapper.contains(welcome)).toEqual(true);
  });
  it('renders user list at path /', function () {
    givenFetchReturns(MOCKDATA);
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/' ]}>
        <App/>
      </MemoryRouter>);
    expect(wrapper.find(UserListContainer)).toHaveLength(1);
  });
  it('renders user list at path /users', function () {
    givenFetchReturns(MOCKDATA);
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/users' ]}>
        <App/>
      </MemoryRouter>);
    expect(wrapper.find(UserListContainer)).toHaveLength(1);
  });
  it('renders user details at path /users/1', function () {
    givenFetchReturns(MOCKDATA);
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/users/1' ]}>
        <App/>
      </MemoryRouter>);
    expect(wrapper.find(UserDetailsContainer)).toHaveLength(1);
  });
});
