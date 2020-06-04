import React, { Component } from 'react';
import axios from 'axios';
import { Button, Typography } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import NotAuthorizedPage from './NotAuthorizedPage';
import NotFoundPage from './NotFoundPage';
import Loading from './Loading';
import { getConfig } from '../utils/getConfig';
import { USERS_URL } from '../api/constants';
import image from '../user.png';
const { Paragraph } = Typography;

const Page = (data) => {
  const { user, errorStatus, loading, username } = data;

  if (loading) return <Loading />;

  if (errorStatus) {
    if (errorStatus === 404) return <NotFoundPage />;
    if (errorStatus === 401) return <NotAuthorizedPage />;
  }

  if (username === user.username) {
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
          textAlign: 'center',
          fontFamily: 'Comic Sans, Comic Sans MS, cursive',
        }}
      >
        <img
          alt='User'
          style={{ padding: '10px 10px 10px 10px' }}
          src={image}
        />
        <h1 style={style}>
          <b>Your Profile</b>
        </h1>
        <h3>
          <b>Name:</b> {user.first_name + ' ' + user.last_name}{' '}
        </h3>
        <h3>
          <b>Email</b>: {user.email}{' '}
        </h3>
        <h3>
          <b>Username</b>: {user.username}{' '}
        </h3>
        <h3>
          <b>Phone number</b>: {user.phone}{' '}
        </h3>
        <Button type='primary' style={{ margin: '5px' }}>
          <Link to={'/users/' + username + '/edit'}>Edit Profile</Link>
        </Button>
        <Button type='primary'>
          <Link to={'/booking/' + username}>My Bookings</Link>
        </Button>
        <br />
      </div>
    );
  }

  return (
    <div
      style={{
        width: '100%',
        paddingRight: '15px',
        paddingLeft: '15px',
        marginTop: '50px',
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
        <h1 style={style}>
          <b>{user.username}'s Profile</b>
        </h1>
        <h3>
          <b>Full Name</b>: {user.first_name + ' ' + user.last_name}{' '}
        </h3>
        <div style={{ display: 'inline-flex', textAlign: 'center' }}>
          <h3>
            <b>Email: </b>
            <Paragraph copyable>{user.email}</Paragraph>
          </h3>{' '}
        </div>
        <br></br>
        <div style={{ display: 'inline-flex', textAlign: 'center' }}>
          <h3>
            <b>Phone number:</b>
            <Paragraph copyable>{user.phone}</Paragraph>
          </h3>
        </div>
      </div>
    </div>
  );
};

class UserProfile extends Component {
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
          errorStatus: null,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({
          errorStatus: err.response.status,
          loading: false,
        });
      });
  }

  componentDidUpdate(prevProps) {
    const uname = this.props.match.params.uname;
    if (uname !== prevProps.match.params.uname) {
      axios
        .get(`${USERS_URL}/${uname}/`, getConfig())
        .then((res) => {
          this.setState({
            user: res.data,
            errorStatus: null,
            loading: false,
          });
        })
        .catch((err) => {
          this.setState({
            errorStatus: err.response.status,
            loading: false,
          });
        });
    }
  }

  render() {
    return (
      <div>
        <Page {...this.state} {...this.props} />
      </div>
    );
  }
}

const style = {
  textAlign: 'center',
};

const mapStateToProps = (state) => {
  return {
    username: state.username,
  };
};

export default connect(mapStateToProps, null)(UserProfile);
