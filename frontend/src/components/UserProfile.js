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
          backgroundColor: '#ffffff',
          opacity: '0.9',
          width: '35%',
          height: '60%',
          display: 'inline-block',
          paddingTop: '50px',
          paddingBottom: '50px',
          color: 'black',
          border: '2px solid #000000',
          bottom: '50px',
        }}
      >
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
        <Button type='primary'>
          <Link to={'/users/' + username + '/edit'}>Edit Profile</Link>
        </Button>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        opacity: '0.9',
        width: '45%',
        height: '60%',
        display: 'inline-block',
        paddingTop: '70px',
        paddingBottom: '50px',
        color: 'black',
        border: '2px solid #000000',
        bottom: '50px',
      }}
    >
      <h1 style={style}>
        <b>{user.username}'s' Profile</b>
      </h1>
      <h3>
        <b>Full Name</b>: {user.first_name + ' ' + user.last_name}{' '}
      </h3>
      <div style={{ display: 'inline-flex', textAlign: 'center' }}>
        <h3>
          <b>Email: </b>
        </h3>{' '}
        <Paragraph copyable>{user.email}</Paragraph>
      </div>
      <br></br>
      <div style={{ display: 'inline-flex', textAlign: 'center' }}>
        <h3>
          <b>Phone number:</b>
        </h3>
        <Paragraph copyable>{user.phone}</Paragraph>
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
