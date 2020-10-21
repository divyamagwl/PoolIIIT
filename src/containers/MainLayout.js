import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Affix } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../actions/auth';
import { Navbar, Nav, Form, Button, Row, Col } from 'react-bootstrap';
import '../static/MainLayout.css';
import '../static/Footer.css';
import {
  faGithub,
  faFacebook,
  faTwitter,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
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
  faAddressBook,
  faSignOutAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import logo from '../logo.png';

import ScrollToTopBtn from './ScrollToTop';

class MainLayout extends Component {
  render() {
    const { logout, isAuthenticated, username } = this.props;
    return (
      <div>
        <div>
          <Affix offsetTop={0}>
            <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
              <Navbar.Brand href='/' style={{ color: '#7acdff' }}>
                <img
                  alt=''
                  src={logo}
                  width='30'
                  height='30'
                  className='d-inline-block align-top'
                  // style={{ paddingBottom: '5px' }}
                />{' '}
                POOLIIIT
              </Navbar.Brand>
              <Navbar.Toggle aria-controls='responsive-navbar-nav' />
              <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='mr-auto'></Nav>
                <Nav>
                  <Nav.Link eventKey='1'>
                    <Link
                      to='/'
                      onClick={() => {
                        window.scroll({
                          top: 0,
                          left: 0,
                          behavior: 'smooth',
                        });
                      }}
                    >
                      <FontAwesomeIcon icon={faHome} />
                      Home
                    </Link>
                  </Nav.Link>
                  {isAuthenticated
                    ? [
                        <Nav.Link eventKey='2'>
                          <Link
                            to='/booking'
                            onClick={() => {
                              window.scroll({
                                top: 0,
                                left: 0,
                                behavior: 'smooth',
                              });
                            }}
                          >
                            {' '}
                            <FontAwesomeIcon icon={faTicketAlt} />
                            Bookings
                          </Link>
                        </Nav.Link>,
                        <Nav.Link eventKey='3'>
                          <Link
                            to={'/users/' + username}
                            onClick={() => {
                              window.scroll({
                                top: 0,
                                left: 0,
                                behavior: 'smooth',
                              });
                            }}
                          >
                            <FontAwesomeIcon icon={faUser} />
                            My Profile
                          </Link>
                        </Nav.Link>,
                        <Nav.Link eventKey='4' onClick={logout}>
                          <Link
                            to='/'
                            onClick={() => {
                              window.scroll({
                                top: 0,
                                left: 0,
                                behavior: 'smooth',
                              });
                            }}
                          >
                            <FontAwesomeIcon icon={faSignOutAlt} />
                            Logout
                          </Link>
                        </Nav.Link>,
                      ]
                    : [
                        <Nav.Link eventKey='5'>
                          <Link
                            to='/login'
                            onClick={() => {
                              window.scroll({
                                top: 0,
                                left: 0,
                                behavior: 'smooth',
                              });
                            }}
                          >
                            <FontAwesomeIcon icon={faSignInAlt} />
                            Login
                          </Link>
                        </Nav.Link>,
                        <Nav.Link eventKey='6'>
                          <Link
                            to='/register'
                            onClick={() => {
                              window.scroll({
                                top: 0,
                                left: 0,
                                behavior: 'smooth',
                              });
                            }}
                          >
                            <FontAwesomeIcon icon={faUserPlus} />
                            Register
                          </Link>
                        </Nav.Link>,
                      ]}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Affix>

          <div style={{ minHeight: '84vh', color: '#7acdff' }}>
            {this.props.children}
          </div>
        </div>
        <div>
          <footer className='site-footer'>
            <div className='container'>
              <div className='row'>
                <div className='col-sm-12 col-md-4'>
                  <h6>
                    About POOLIIIT{' '}
                    <FontAwesomeIcon
                      icon={faPlaneDeparture}
                      transform='shrink-3'
                    />
                  </h6>
                  <p className='text'>
                    We are a group of young enthusiasts who are part of the
                    developers club of International Institute of Information
                    Technology Bangalore,named Zense.We have made this simple
                    project to make pooling easier.
                  </p>
                </div>

                <div className='col-md-4 col-sm-6 col-xs-12'>
                  <h6>
                    Social Links{' '}
                    <FontAwesomeIcon
                      icon={faAddressBook}
                      transform='shrink-3'
                    />
                  </h6>
                  <span
                    style={{
                      color: 'white',
                    }}
                  >
                    &nbsp;
                    <FontAwesomeIcon icon={faPhone} />
                    &nbsp;{' '}
                    <span style={{ color: '#737373' }}>
                      {' '}
                      <a href='#'>123-456-789</a>
                    </span>
                  </span>
                  <br />
                  <br />
                  <span style={{ color: 'white' }}>
                    &nbsp;
                    <FontAwesomeIcon icon={faEnvelope} />
                    &nbsp;
                    <span style={{ color: '#737373' }}>
                      <a href='#'> zense@iiitb.org</a>
                    </span>
                  </span>
                  <br />
                  <br />
                  <ul className='social-icons'>
                    <li>
                      <a className='facebook' href='#'>
                        <FontAwesomeIcon icon={faFacebook} size='2x' />
                      </a>
                    </li>
                    <li>
                      <a className='twitter' href='#'>
                        <FontAwesomeIcon icon={faTwitter} size='2x' />
                      </a>
                    </li>
                    <li>
                      <a className='dribbble' href='#'>
                        <FontAwesomeIcon icon={faGithub} size='2x' />
                      </a>
                    </li>
                    <li>
                      <a className='linkedin' href='#'>
                        <FontAwesomeIcon icon={faLinkedin} size='2x' />
                      </a>
                    </li>
                  </ul>
                </div>

                <div className='col-xs-6 col-md-3'>
                  <h6>Feedback</h6>
                  <Form>
                    <Form.Group as={Row} controlId='formPlaintextEmail'>
                      <Form.Label column sm='2'>
                        Email
                      </Form.Label>
                      <Col sm='10'>
                        <Form.Control type='email' placeholder='Enter email' />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId='formBasicTextArea'>
                      <Form.Label column sm='2'>
                        Input
                      </Form.Label>
                      <Col sm='10'>
                        <Form.Control
                          as='textarea'
                          rows='3'
                          placeholder='Your Feedback'
                        />
                      </Col>
                    </Form.Group>
                    <Button variant='secondary' type='submit'>
                      Submit
                    </Button>
                  </Form>
                </div>
              </div>
              {/* <hr> */}
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className='col-md-12 col-sm-6 col-xs-12'>
                <p className='copyright-text'>
                  Copyright &copy; 2020 All Rights Reserved by
                  <a href='https://zense.co.in/'> Zense</a>.
                </p>
              </div>
              <br />
            </div>
          </footer>
        </div>
      </div>
      // <ScrollToTopBtn />
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
