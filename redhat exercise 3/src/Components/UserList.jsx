import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Table from 'antd/lib/table';

const { Column } = Table;

export default class UserList extends Component {
  render() {
    const { users } = this.props;

    return (
      <Table
        dataSource={users}
        pagination={false}
        rowKey="id"
      >
        <Column
          title="Name"
          dataIndex="name"
          render={(name, row) => <Link to={{ pathname: `/users/${row.id}`, state: { user: row } }}>{name}</Link>}
        />
        <Column
          title="Username"
          dataIndex="username"
        />
        <Column
          title="E-mail"
          dataIndex="email"
        />
        <Column
          title="Address"
          dataIndex="address"
          render={address => <div>{`${address.street}, ${address.city} ${address.zipcode}`}</div>}
        />
      </Table>
    );
  }
}

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    address: PropTypes.shape({
      city: PropTypes.string.isRequired,
      geo: PropTypes.shape({
        lat: PropTypes.string,
        lng: PropTypes.string
      }),
      street: PropTypes.string.isRequired,
      suite: PropTypes.string,
      zipcode: PropTypes.string.isRequired
    }).isRequired,
    company: PropTypes.shape({
      bs: PropTypes.string,
      catchPhrase: PropTypes.string,
      name: PropTypes.string
    }),
    email: PropTypes.string,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string,
    username: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired
  }))
};
