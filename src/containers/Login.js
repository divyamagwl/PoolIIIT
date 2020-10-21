import React, { Component } from 'react';

import { Form, Input, Button,Row,Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { useSpring, animated } from 'react-spring'
import { connect } from 'react-redux';

import * as actions from '../actions/auth';
import { ErrorHandler } from '../utils/ErrorHandler';
import '../static/Login.css'; 

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
const trans1 = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`
const trans3 = (x, y) => `translate3d(${x / 6 - 250}px,${y / 6 - 200}px,0)`
const trans4 = (x, y) => `translate3d(${x / 3.5}px,${y / 3.5}px,0)`

function Card() {
  const [props, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }))
  return (
    <div class="container" onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
      <animated.div class="card1" style={{ transform: props.xy.interpolate(trans1) }} />
      <animated.div class="card3" style={{ transform: props.xy.interpolate(trans3) }} />
      <animated.div class="card4" style={{ transform: props.xy.interpolate(trans4) }} />
    </div>
  )
}


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
         <Row>
                <Col span={10}><Card/></Col>
         </Row>
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
                    color:'black'
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
                <NavLink style={{ marginLeft: '5px' }} to='/register'>
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
