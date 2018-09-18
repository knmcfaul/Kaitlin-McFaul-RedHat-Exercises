import React, { Component } from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import Layout from 'antd/lib/layout';

import UserListContainer from './Containers/UserListContainer';
import UserDetailsContainer from './Containers/UserDetailsContainer';

import './styles/app.css';

const { Header, Footer, Sider, Content } = Layout;

class App extends Component {
  render() {
    return (
      <div className="app">
        <Layout>
          <Header>
            <div className="header">
              <h2>Users Sample Project</h2>
            </div>
          </Header>
          <Layout>
            <Sider>
              <Link to="/">
                <div className="sider-link">User List</div>
              </Link>
            </Sider>
            <Content>
              <Route exact path="/" render={() => <Redirect to="/users"/>}/>
              <Route exact path="/users" component={UserListContainer}/>
              <Route path="/users/:userId" component={UserDetailsContainer}/>
            </Content>
          </Layout>
          <Footer>by Kaitlin McFaul, 2018</Footer>
        </Layout>
      </div>
    );
  }
}

export default App;
