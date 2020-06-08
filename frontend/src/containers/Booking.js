import React, { Component } from 'react';
import axios from 'axios';
import '../static/Booking.css';
import AddBooking from '../components/AddBooking';
import NotAuthorizedPage from '../components/NotAuthorizedPage';
import Loading from '../components/Loading';
import { BOOKING_URL } from '../api/constants';
import { getConfig } from '../utils/getConfig';
import { ErrorHandler } from '../utils/ErrorHandler';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import  ScrollToTopBtn from './ScrollToTop'; 

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
    let bookings = null;
    const arr = this.state.bookings;
    bookings = (
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ textAlign: 'left', color: 'darkblue' }}>All Bookings</h1>
        <div className='row'>
          {arr.map((booking) => {
            return (
              <div className='column'>
                <div className='card'>
                  <h3>
                    <Link to={'/users/' + booking.user}>{booking.user}</Link>
                  </h3>
                  <h4 style={{ color: 'darkblue' }}>
                    <b>Date: </b>
                    {booking.date}
                  </h4>
                  <h4 style={{ color: 'darkblue' }}>
                    <b>Time: </b> {booking.time}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
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
            {console.log(this.state.bookings)}
            {bookings}
          </div>
        )}
      <ScrollToTopBtn /> 
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
