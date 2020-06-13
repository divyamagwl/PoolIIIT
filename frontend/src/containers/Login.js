import React, { Component } from 'react';

import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';

import * as actions from '../actions/auth';
import { ErrorHandler } from '../utils/ErrorHandler';
import img from '../regimg.png';
class LoginForm extends Component {
  onFinish = (values) => {
    this.props.onAuth(values.username, values.password);
  };

  onAuthenticated = () => {
    this.props.history.push('/');
  };

  render() {
    if (this.props.isAuthenticated) {
      this.onAuthenticated();
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{ErrorHandler(this.props.error)}</p>;
    }

    return (
      <div
        style={{
          width: '100%',
          paddingRight: '15px',
          paddingLeft: '15px',
          marginTop: '30px',
          marginRight: 'auto',
          marginLeft: 'auto',
          boxSizing: 'border-box',
          maxWidth: '1140px',
          lineHeight: '1.5',
          textAlign: 'left',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            marginRight: '-15px',
            marginLeft: '-15px',
          }}
        >
          <div
            style={{
              flex: '0 0 50%',
              maxWidth: '50%',
              boxSizing: 'border-box',
              marginRight: 'auto',
              marginLeft: 'auto',
              marginTop: '70px',
              textAlign: 'center',
              display: 'block !important',
            }}
          >
            <img alt='register-theme' src={img} style={{width:'100%',height:"auto"}}/>
            <h2
              style={{
                marginTop: '30px',
                marginBottom: '15px',
                marginLeft: '35px',
                maxHeight: '400px',
                maxWidth: '80%',
                textAlign: 'center',
                color: 'rgb(13, 28, 40)',
              }}
            >
              Login to Start Booking!
            </h2>
          </div>
          <div
            style={{
              flex: '0 0 50%',
              maxWidth: '50%',
              padding: '85px 10px 10px 10px',
              marginRight: 'auto',
              marginLeft: 'auto',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ color: 'red' }}>{errorMessage}</div>
            <Form
              name='normal_login'
              className='login-form'
              onFinish={this.onFinish}
            >
              <Form.Item
                name='username'
                rules={[
                  {
                    required: true,
                    message: 'Please input your Username!',
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className='site-form-item-icon' />}
                  placeholder='Username'
                  style={{ color: 'black', opacity: '1' }}
                />
              </Form.Item>

              <Form.Item
                name='password'
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className='site-form-item-icon' />}
                  type='password'
                  placeholder='Password'
                />
              </Form.Item>

              <Form.Item>
                <NavLink
                  to='#'
                  style={{
                    fontSize: '16px',
                  }}
                >
                  {' '}
                  Forgot Password?{' '}
                </NavLink>
              </Form.Item>

              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='login-form-button'
                  style={{ marginRight: '10px' }}
                >
                  Log in
                </Button>
                New User?
                <NavLink style={{ marginLeft: '5px' }} to='/register/'>
                  {' '}
                  Register here{' '}
                </NavLink>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
    isAuthenticated: state.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password) =>
      dispatch(actions.authLogin(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
