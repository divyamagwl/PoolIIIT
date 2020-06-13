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
import { Row, Col } from 'antd';
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
      <div>
        <Row>
          {arr.map((booking) => {
            return (
              <Col style={{ padding: '25px 25px 25px 25px' }}>
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
              </Col>
            );
          })}
        </Row>
      </div>
    );
    return (
      <div>
        {this.state.loading ? (
          <Loading />
        ) : !this.props.isAuthenticated ? (
          <NotAuthorizedPage />
        ) : (
          <div>
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <h1 style={{ color: 'red' }}>{this.state.error}</h1>
              <AddBooking />
              <h1
                style={{
                  textAlign: 'center',
                  color: 'darkblue',
                  marginTop: '25px',
                }}
              >
                All Bookings
              </h1>
            </div>
            <div className='container'>{bookings}</div>
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
