import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/user-details.css';

export default class UserDetails extends Component {
  render(){
    const { user } = this.props;
    const { name, address, company, email, phone, username, website } = user;

    return (
      <div className="user-details">
        <h2>{name} <small>(username: {username})</small></h2>
        <h3>
          {`${address.street}, ${address.suite}, ${address.city} ${address.zipcode} (${address.geo.lat}, ${address.geo.lng})`}
        </h3>
        <div>
          Company: {company.name}.
        </div>
        <div>
          Catchphrase: {company.catchPhrase}.
        </div>
        <div>
          Tags: {company.bs}
        </div>
        <div className="contact-section">
          <div>
            Website: {website}
          </div>
          <div>
            Contact @ <strong>{phone}</strong> or by E-mail: <strong>{email}</strong>
          </div>
        </div>
      </div>
    );
  }
}

UserDetails.propTypes = {
  user: PropTypes.shape({
    address: PropTypes.shape({
      city: PropTypes.string.isRequired,
      geo: PropTypes.shape({
        lat: PropTypes.string.isRequired,
        lng: PropTypes.string.isRequired
      }).isRequired,
      street: PropTypes.string.isRequired,
      suite: PropTypes.string.isRequired,
      zipcode: PropTypes.string.isRequired
    }).isRequired,
    company: PropTypes.shape({
      bs: PropTypes.string.isRequired,
      catchPhrase: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired
  }).isRequired
};
