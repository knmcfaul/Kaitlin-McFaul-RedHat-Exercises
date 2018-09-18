import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spin from 'antd/lib/spin';

import UserDetails from '../Components/UserDetails';

import '../styles/user-details-container.css';

export default class UserDetailsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isLoading: true
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    const pathProps = this.props.location.state;
    if ( pathProps ) {
      console.log('user data available');
      this.setState({ user: pathProps.user, isLoading: false });
    } else {
      const userId = Number.parseInt(this.props.match.params.userId, 10);

      fetch('http://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .catch(e => {
          console.log('fetch failed with error: ', e);
          this.setState({ users: null, isLoading: false });
        })
        .then(data => {
          const userData = data.filter(user => user.id === userId).pop();
          this.setState({ user: userData, isLoading: false });
          console.log('user data fetched: ', this.state.user);
        })
        .catch(e => {
          console.log('json data parse failed with error: ', e);
          this.setState({ users: null, isLoading: false });
        });
    }
  }

  render() {
    const { user, isLoading } = this.state;
    return (
      <div className="user-details-container">
        {isLoading && <Spin />}
        {!isLoading && !user &&
          <h3 className="empty-message">No user found. Please return to the user list and select a valid user.</h3>}
        {!isLoading && user && <UserDetails user={user}/>}
      </div>
    );
  }
}

UserDetailsContainer.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string
    })
  })
};
