import React, { Component } from 'react';

import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';

import * as actions from '../actions/auth';
import { ErrorHandler } from '../utils/ErrorHandler';

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
          backgroundColor: '#ffffff',
          opacity: '0.9',
          width: '30%',
          height: '60%',
          display: 'inline-block',
          paddingTop: '70px',
          paddingBottom: '50px',
          color: 'black',
          border: '2px solid #000000',
        }}
      >
        <div>
          <div>{errorMessage}</div>
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
