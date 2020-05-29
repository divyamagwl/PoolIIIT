import React, { Component } from 'react';

import { Form, Input, Button } from 'antd';

import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  MobileOutlined,
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions/auth';
import { ErrorHandler } from '../utils/ErrorHandler';

class RegisterForm extends Component {
  onFinish = (values) => {
    this.props.onAuth(
      values.firstname,
      values.lastname,
      values.username,
      values.email,
      values.password,
      values.phone
    );
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
          width: '35%',
          height: '55%',
          display: 'inline-block',
          paddingTop: '50px',
          paddingBottom: '20px',
          color: 'black',
          border: '2px solid #000000',
          bottom: '50px',
        }}
      >
        <div>{errorMessage}</div>
        <Form name='register' onFinish={this.onFinish} scrollToFirstError>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Form.Item
              name='firstname'
              rules={[
                {
                  required: true,
                  message: 'Please input your Firstname!',
                },
              ]}
            >
              <Input
                style={{ display: 'inline-flex', width: '99%' }}
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='Firstname'
              />
            </Form.Item>

            <Form.Item
              name='lastname'
              rules={[
                {
                  required: true,
                  message: 'Please input your Lastname!',
                },
              ]}
            >
              <Input
                style={{ display: 'inline-flex', width: '100%' }}
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='Lastname'
              />
            </Form.Item>
          </div>
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
            />
          </Form.Item>

          <Form.Item
            name='email'
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
            hasFeedback
          >
            <Input
              prefix={<MailOutlined className='site-form-item-icon' />}
              placeholder='Email'
            />
          </Form.Item>

          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Password'
            />
          </Form.Item>

          <Form.Item
            name='confirm'
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    'The two passwords that you entered do not match!'
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Confirm Password'
            />
          </Form.Item>

          <Form.Item
            name='phone'
            rules={[
              {
                required: true,
                message: 'Please input your phone number!',
              },
            ]}
          >
            <Input
              addonBefore={'+91'}
              prefix={<MobileOutlined className='site-form-item-icon' />}
              style={{ width: '100%' }}
              placeholder='Phone number'
            />
          </Form.Item>

          <Form.Item>
            <Button
              style={{ marginRight: '10px' }}
              type='primary'
              htmlType='submit'
            >
              Register
            </Button>
            Already have an account?
            <NavLink style={{ marginLeft: '5px' }} to='/login/'>
              {' '}
              Login
            </NavLink>
          </Form.Item>
        </Form>
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
    onAuth: (firstname, lastname, username, email, password, phone) =>
      dispatch(
        actions.authSignup(
          firstname,
          lastname,
          username,
          email,
          password,
          phone
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
