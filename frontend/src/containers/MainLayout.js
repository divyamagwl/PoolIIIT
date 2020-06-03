import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Layout, Menu, Breadcrumb, Affix } from 'antd';
import { connect } from 'react-redux';


import '../static/Navbar.css';
import * as actions from '../actions/auth';
import '../static/MainLayout.css';

import '../App.css';
import logo from '../logo.png';
const { Header, Content, Footer } = Layout;

const breadcrumbNameMap = {
  '/login': 'Login',
  '/register': 'Register',
  '/booking': 'Booking',
  '/users': 'Users',
};

const BreadCrumbComponent = withRouter((props) => {
  const { location } = props;
  const pathSnippets = location.pathname.split('/').filter((i) => i);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [
    <Breadcrumb.Item key='/'>
      <Link to='/'>Home</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  return (
    <div className='crumb'>
      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
    </div>
  );
});

const Location = withRouter((props) => {
  const { location, logout, isAuthenticated, username } = props;

  return (
    <Menu
      theme='dark'
      mode='horizontal'
      selectedKeys={[location.pathname]}
      style={{ lineHeight: '70px', textAlign: 'right' }}
      className="hamburger"
    >
      <Menu.Item key='/' className="nav-links">
        <Link to='/'>Home</Link>
      </Menu.Item>
      {isAuthenticated
        ? [
            <Menu.Item key='/booking' className="nav-links">
              <Link to='/booking'>Bookings</Link>
            </Menu.Item>,
            <Menu.Item key={'/users/' + username}  className="nav-links">
              <Link to={'/users/' + username}>My Profile</Link>
            </Menu.Item>,
            <Menu.Item key='/logout' onClick={logout}  className="nav-links">
              <Link to='/'>Logout</Link>
            </Menu.Item>,
          ]
        : [
            <Menu.Item key='/login' className="nav-links">
              <Link to='/login' >Login</Link>
            </Menu.Item>,
            <Menu.Item key='/register' className="nav-links">
              <Link to='/register'>Register</Link>
            </Menu.Item>,
          ]}
    </Menu>
  );
});

class MainLayout extends Component {
  render() {
    return (
      <div>
        <div>
          <Affix offsetTop={0}>
            <Header>
              <div className='logo'>
                <Link to='/' style={{ color: 'inherit' }}>
                  <h2 style={{ color: '#7acdff' }}>
                    PoolIIIT
                    <img
                      src={logo}
                      alt='Logo'
                      style={{
                        color: 'green',
                        paddingBottom: '20px',
                        height: '64px',
                      }}
                    ></img>
                  </h2>
                </Link>
              </div>
              <Location {...this.props} />
            </Header>
          </Affix>

          <div style={{ minHeight: '84vh', color: '#7acdff' }}>
            {this.props.children}
          </div>
        </div>
        <Footer
          style={{
            textAlign: 'center',
            fontSize: '20px',
            bottom: '0',
            position: 'relative',
            backgroundColor: 'rgb(13, 28, 40)',
          }}
        >
          Made by Zense
        </Footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated,
    username: state.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainLayout)
);
