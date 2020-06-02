import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { getConfig } from '../utils/getConfig';
import Loading from './Loading';
import { USERS_URL } from '../api/constants';
import NotAuthorizedPage from './NotAuthorizedPage';
import { connect } from 'react-redux';

class EditProfile extends Component {
  state = {
    user: [],
    loading: true,
    errorStatus: null,
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
    axios
      .put(
        `${USERS_URL}/${uname}/`,
        {
          first_name: values.first_name,
          last_name: values.last_name,
          phone: values.phone,
        },
        getConfig()
      )
      .then((res) => {
        this.props.history.push('/users/' + uname);
      })
      .catch((err) => {
        console.log(err);
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
    const br = { borderRadius: '7px', padding: '7px' };
    return (
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
          {this.state.loading ? (
            <Loading />
          ) : this.state.errorStatus ? (
            <NotAuthorizedPage />
          ) : notAuthorized() ? (
            <NotAuthorizedPage />
          ) : (
            <Form
              name='EditDetails'
              layout='vertical'
              // initialValues={this.state.user}
              onFinish={this.onFinish}
            >
              <Form.Item
                name='first_name'
                label='First name'
                initialValue={this.state.user.first_name}
                rules={[
                  {
                    required: true,
                    message: 'First name is required!',
                  },
                ]}
              >
                <Input style={br} />
              </Form.Item>

              <Form.Item
                name='last_name'
                label='Last name'
                initialValue={this.state.user.last_name}
                rules={[
                  {
                    required: true,
                    message: 'Last name is required!',
                  },
                ]}
              >
                <Input style={br} />
              </Form.Item>

              <Form.Item
                name='phone'
                label='Phone number'
                initialValue={this.state.user.phone}
                rules={[
                  {
                    required: true,
                    message: 'Please input your phone number!',
                  },
                ]}
              >
                <Input style={br} />
              </Form.Item>

              <Button type='primary' htmlType='submit'>
                Edit
              </Button>
            </Form>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
  };
};

export default connect(mapStateToProps, null)(EditProfile);
