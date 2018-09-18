import React, { Component } from 'react';
import Spin from 'antd/lib/spin';

import UserList from '../Components/UserList';

import '../styles/user-list-container.css';

export default class UserListContainer extends Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.state = {
      users: null,
      isLoading: true
    };
  }

  getData() {
    this.setState({ isLoading: true });
    fetch('http://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .catch(e => {
        console.log('fetch failed with error: ', e);
        this.setState({ users: null, isLoading: false });
      })
      .then(data => {
        if ( data && data.length !== 0 ) {
          data.sort((a, b) => a.name.localeCompare(b.name));
          this.setState({ users: data, isLoading: false });
          console.log('user list fetched: ', this.state.users);
        } else {
          this.setState({ users: null, isLoading: false });
        }
      })
      .catch(e => {
        console.log('json data parse failed with error: ', e);
        this.setState({ users: null, isLoading: false });
      });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const { users, isLoading } = this.state;
    return (
      <React.Fragment>
        {isLoading && <div className="user-list-spin-padding"><Spin /></div>}
        {!isLoading && !users &&
          <h3 className="user-list-message-padding empty-message">No users found. Please check the server status.</h3>}
        {!isLoading && users && <UserList users={users}/>}
      </React.Fragment>
    );
  }
}
