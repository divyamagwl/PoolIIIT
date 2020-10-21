import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { getConfig } from '../utils/getConfig';
import Loading from './Loading';
import { USERS_URL } from '../api/constants';
import NotAuthorizedPage from './NotAuthorizedPage';
import { connect } from 'react-redux';

class EditPassword extends Component {
  state = {
    user: [],
    loading: true,
    errorStatus: null,
    message: null,
  };

  componentDidMount() {
    const uname = this.props.match.params.uname;
    axios
      .get(`${USERS_URL}/${uname}/`, getConfig())
      .then((res) => {
        this.setState({
          user: res.data,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
          errorStatus: err.response.status,
        });
      });
  }

  onFinish = (values) => {
    const uname = this.props.match.params.uname;
    console.log(values);
    axios
      .put(
        `${USERS_URL}/${uname}/reset-password/`,
        {
          current_password: values.current_password,
          new_password: values.password,
        },
        getConfig()
      )
      .then((res) => {
        this.props.history.push('/users/' + uname);
      })
      .catch((err) => {
        console.log(err.message);
        if (err.message === 'Request failed with status code 400') {
          this.setState({ message: 'Wrong Current Password!' });
        }
      });
  };

  render() {
    /* TODO: Properly shift it to functions */
    const notAuthorized = () => {
      if (this.state.user.username === this.props.username) {
        return false;
      }
      return true;
    };

    return (
      <div>
        {
          this.state.loading ? (
            <Loading />
          ) : this.state.errorStatus ? (
            <NotAuthorizedPage />
          ) : notAuthorized() ? (
            <NotAuthorizedPage />
          ) : (
            <div
              style={{
                width: '100%',
                paddingRight: '15px',
                paddingLeft: '15px',
                marginTop: '40px',
                marginRight: 'auto',
                marginLeft: 'auto',
                boxSizing: 'border-box',
                maxWidth: '1140px',
                lineHeight: '1.5',
                textAlign: 'center',
                fontFamily: 'Comic Sans, Comic Sans MS, cursive',
              }}
            >
              <div
                style={{
                  display: 'block',
                  border: '1px solid #eee',
                  boxShadow: '0 2px 2px #ccc',
                  padding: '20px 20px 20px 20px',
                  borderRadius: '7px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  maxWidth: '50%',
                }}
              >
                <div>
                  <div style={{ color: 'red' }}>{this.state.message}</div>
                  <Form
                    name='EditPassword'
                    layout='vertical'
                    onFinish={this.onFinish}
                  >
                    <Form.Item
                      name='current_password'
                      label='Current Password'
                      rules={[
                        {
                          required: true,
                          message: 'Please input your current password!',
                        },
                      ]}
                      hasFeedback
                    >
                      <Input.Password
                        style={{ borderRadius: '7px' }}
                        type='password'
                      />
                    </Form.Item>
                    <Form.Item
                      name='password'
                      label='New Password'
                      rules={[
                        {
                          required: true,
                          message: 'Please input your current password!',
                        },
                      ]}
                      hasFeedback
                    >
                      <Input.Password
                        style={{ borderRadius: '7px' }}
                        type='password'
                      />
                    </Form.Item>

                    <Form.Item
                      name='confirm'
                      label='Confirm Password'
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
                        style={{ borderRadius: '7px' }}
                        type='password'
                      />
                    </Form.Item>

                    <Button type='primary' htmlType='submit'>
                      Edit
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
  };
};

export default connect(mapStateToProps, null)(EditPassword);
