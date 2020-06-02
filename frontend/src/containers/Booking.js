import React, { Component } from 'react';
import { Table } from 'antd';
import axios from 'axios';

import AddBooking from '../components/AddBooking';
import NotAuthorizedPage from '../components/NotAuthorizedPage';
import Loading from '../components/Loading';
import { BOOKING_URL } from '../api/constants';
import { getConfig } from '../utils/getConfig';
import { ErrorHandler } from '../utils/ErrorHandler';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const { Column } = Table;

class Booking extends Component {
  state = {
    bookings: [],
    error: null,
    loading: true,
  };

  componentDidMount() {
    axios
      .get(BOOKING_URL, getConfig())
      .then((res) => {
        this.setState({
          bookings: res.data,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({
          error: ErrorHandler(err),
          loading: false,
        });
      });
  }

  render() {
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
        }}
      >
        {this.state.loading ? (
          <Loading />
        ) : !this.props.isAuthenticated ? (
          <NotAuthorizedPage />
        ) : (
          <div>
            <h1 style={{ color: 'red' }}>{this.state.error}</h1>
            <AddBooking />
            <div style={{ marginBottom: '15px' }}></div>
            <Table dataSource={this.state.bookings} rowKey='id'>
              <Column
                title='User'
                dataIndex='user'
                key='user'
                render={(text) => <Link to={'users/' + text}>{text}</Link>}
              />
              <Column title='Date' dataIndex='date' key='date' />
              <Column title='Time' dataIndex='time' key='time' />
              <Column
                title='Flexibility Before'
                dataIndex='flexibility_before'
                key='flexibility_before'
              />
              <Column
                title='Flexibility After'
                dataIndex='flexibility_after'
                key='flexibility_after'
              />
            </Table>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated,
  };
};

export default connect(mapStateToProps, null)(Booking);
