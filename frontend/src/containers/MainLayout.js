import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Layout, Menu, Affix } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../actions/auth';

import '../static/Navbar.css';
import '../static/MainLayout.css';
import '../static/Footer.css';

import {
  FacebookFilled,
  GithubFilled,
  LinkedinFilled,
} from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faSignInAlt,
  faUserPlus,
  faUsers,
  faTicketAlt,
  faPlaneDeparture,
  faPhone,
  faEnvelope,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

import logo from '../logo.png';

import ScrollToTopBtn from './ScrollToTop'; 

const { Header } = Layout;

const Location = withRouter((props) => {
  const { location, logout, isAuthenticated, username } = props;

  return (
    <Menu
      theme='dark'
      mode='horizontal'
      selectedKeys={[location.pathname]}
      style={{ lineHeight: '70px', textAlign: 'right' }}
      className='hamburger'
    >
      <Menu.Item key='/' className='nav-links'>
         <Link to='/'> <FontAwesomeIcon icon={faHome} />Home</Link>
      </Menu.Item>
      {isAuthenticated
        ? [
            <Menu.Item key='/booking' className='nav-links'>
              <Link to='/booking'> <FontAwesomeIcon icon={faTicketAlt} />Bookings</Link>
            </Menu.Item>,
            <Menu.Item key={'/users/' + username} className='nav-links'>
              <Link to={'/users/' + username}><FontAwesomeIcon icon={faUsers} />My Profile</Link>
            </Menu.Item>,
            <Menu.Item key='/logout' onClick={logout} className='nav-links'>
              <Link to='/'><FontAwesomeIcon icon={faSignOutAlt} />Logout</Link>
            </Menu.Item>,
          ]
        : [
            <Menu.Item key='/login' className='nav-links'>
               <Link to='/login'><FontAwesomeIcon icon={faSignInAlt} />Login</Link>
            </Menu.Item>,
            <Menu.Item key='/register' className='nav-links'>
              <Link to='/register'><FontAwesomeIcon icon={faUserPlus} />Register</Link>
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

        {/*Footer*/}
        <div className='footer'>
          <div className='footer-content'>
            {/*About*/}

            <div
              className='footer-section about'
              style={{ flex: '0 0 30%', marginLeft: '10px' }}
            >
              <h1>
                <FontAwesomeIcon icon={faPlaneDeparture} transform='shrink-3' />
                <span style={{ color: '#046687', fontSize: '40px' }}>
                  {' '}
                  Pool
                </span>
                <span style={{ fontSize: '40px' }}>IIIT</span>
              </h1>
              &nbsp;
              <p style={{ fontSize: '20px' }}>
                Now let's save money
                <br />
                and time.
              </p>
              <div className='contact'>
                <span>
                  &nbsp;
                  <FontAwesomeIcon icon={faPhone} />
                  &nbsp; 123-456-789
                </span>
                <span>
                  &nbsp;
                  <FontAwesomeIcon icon={faEnvelope} />
                  &nbsp;zense@iiitb.org
                </span>
              </div>
              <div>
                &nbsp;
                <a href='/'>
                  <FacebookFilled style={{ fontSize: 40 }} />
                </a>
                &nbsp;
                <a href='https://github.com/zense'>
                  <GithubFilled style={{ fontSize: 40, color: '#ffffff' }} />
                </a>
                &nbsp;
                <a href='/'>
                  <LinkedinFilled style={{ fontSize: 40 }} />
                </a>
              </div>
            </div>

            {/*End of About*/}
            {/*Links*/}
            <div
              className='footer-section links'
              style={{
                flex: '0 0 30%',
                marginLeft: '20px',
              }}
            >
              <br />
              <h1>
                <span style={{ color: '#046687' }}>Quick</span> Links
              </h1>
              <br></br>
              <ul>
                <a href='/'>
                  <li>Events</li>
                </a>
                <a href='/'>
                  <li>Terms and Conditions</li>
                </a>
                <a href='https://github.com/divyamagwl/PoolIIIT'>
                  <li>Contribute</li>
                </a>
              </ul>
            </div>
            {/*End of Links*/}
            {/*Start of Contact*/}
            <div
              className='footer-section contact-form'
              style={{
                flex: '0 0 30%',
                marginLeft: '10px',
              }}
            >
              <br />
              <h1>
                <span style={{ color: '#046687' }}>Contact</span> Us
              </h1>
              <br></br>
              <form action='index.html' method='post'>
                <input
                  type='email'
                  name='email'
                  className='text-input contact-input'
                  placeholder='Enter Your Email Address'
                ></input>

                <textarea
                  name='message'
                  className='text-input contact-input'
                  placeholder='Please leave us a Feedback'
                ></textarea>
                <button type='submit' className='btn btn-big contact-btn'>
                  <FontAwesomeIcon icon={faEnvelope} />
                  &nbsp;Send
                </button>
              </form>
            </div>
            {/*End of Contact*/}
          </div>
          <div className='footer-bottom'>&copy;Designed by Zense| IIITB</div>
        </div>
        <ScrollToTopBtn/>
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
