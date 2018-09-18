/* global jest, describe, it, expect, beforeEach */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import UserList from '../Components/UserList';
import Table from 'antd/lib/table';

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

beforeEach(() => {
  jest.clearAllMocks();
});

describe('UserList', function () {
  it('successfully renders Table child component with data passed via props', function () {
    const wrapper = shallow(<UserList users={MOCKDATA}/>);
    expect(wrapper.find(Table)).toHaveLength(1);
  });
  it('renders expected mock data via props', function () {
    const wrapper = mount(<MemoryRouter><UserList users={MOCKDATA}/></MemoryRouter>);
    expect(wrapper.find('.ant-table-tbody tr').length).toEqual(MOCKDATA.length);
    expect(wrapper.find('.ant-table-tbody tr').get(0).props.children[ 0 ].props.record.name).toEqual(MOCKDATA[ 0 ].name);
  });
});
