import React, { Component } from 'react';
import axios from 'axios';
import { getConfig } from '../utils/getConfig';
import { Link } from 'react-router-dom';
import { ErrorHandler } from '../utils/ErrorHandler';
import NotAuthorizedPage from '../components/NotAuthorizedPage';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'antd';
import '../static/Booking.css';
import UpdateBooking from '../components/UpdateBooking';
import DeleteBooking from '../components/DeleteBooking';

class MyBooking extends Component {
  state = {
    user: [],
    children: [],
    error: null,
    count: 0,
  };

  FilteredDisplay = (booking) => {
    const id = booking.id;
    axios
      .get(`http://127.0.0.1:8000/booking/${id}/`, getConfig())
      .then((res) => {
        console.log(res.data);
        this.setState({
          children: res.data,
          count: 1,
        });
      })
      .catch((err) => {
        this.setState({
          error: ErrorHandler(err),
        });
        console.log(err);
      });

    var elmnt = document.getElementById('similar');
    elmnt.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  componentDidMount() {
    const uname = this.props.match.params.uname;
    console.log(uname);
    axios
      .get(`http://127.0.0.1:8000/users/${uname}/booking/`, getConfig())
      .then((res) => {
        this.setState({
          user: res.data,
        });
        console.log(res.data);
      })
      .catch((err) => {
        this.setState({
          error: ErrorHandler(err),
        });
        console.log(err);
      });
  }

  render() {
    let mybookings = null;
    const arr = this.state.user;
    mybookings = (
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
                  <h4 style={{ color: 'darkblue' }}>
                    <b>Location: </b> {booking.location}
                  </h4>
                  <div style={{ display: 'inline-flex', textAlign: 'center' }}>
                    <UpdateBooking booking_url={booking.booking_url} />
                    &nbsp;&nbsp;
                    <DeleteBooking booking_url={booking.booking_url} />
                    &nbsp;&nbsp;
                  </div>
                  <br />
                  <Button
                    type='primary'
                    size='large'
                    style={{ marginTop: '10px' }}
                    onClick={() => this.FilteredDisplay(booking)}
                  >
                    View Similar
                  </Button>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    );
    let otherbookings = null;
    const otherarr = this.state.children;
    if (this.state.count === 0) {
      otherbookings = (
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: 'darkblue', textAlign: 'center' }}>
            Bookings with similar timings
          </h1>{' '}
          <h2
            style={{
              textAlign: 'center',
              color: 'blue',
              marginTop: '25px',
            }}
          >
            Click on the view button on one of your bookings to see bookings
            similar to it.
          </h2>
        </div>
      );
    } else {
      if (otherarr.length >= 1) {
        otherbookings = (
          <div>
            <h1 style={{ color: 'darkblue', textAlign: 'center' }}>
              Bookings with similar timings
            </h1>
            <Row>
              {otherarr.map((booking) => {
                return (
                  <Col style={{ padding: '25px 25px 25px 25px' }}>
                    <div className='card'>
                      <h3>
                        <Link to={'/users/' + booking.user}>
                          {booking.user}
                        </Link>
                      </h3>
                      <h4 style={{ color: 'darkblue' }}>
                        <b>Date: </b>
                        {booking.date}
                      </h4>
                      <h4 style={{ color: 'darkblue' }}>
                        <b>Time: </b> {booking.time}
                      </h4>
                      <h4 style={{ color: 'darkblue' }}>
                        <b>Location: </b> {booking.location}
                      </h4>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        );
      } else {
        otherbookings = (
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ color: 'darkblue', textAlign: 'center' }}>
              Bookings with similar timings
            </h1>{' '}
            <h2
              style={{
                textAlign: 'center',
                color: 'blue',
                marginTop: '25px',
              }}
            >
              Sorry! But There are no bookings similar to the booking you
              clicked.
            </h2>
          </div>
        );
      }
    }
    return (
      <div>
        {!this.props.isAuthenticated ? (
          <NotAuthorizedPage />
        ) : (
          <div>
            <h1 style={{ color: 'red', textAlign: 'center' }}>
              {this.state.error}
            </h1>
            <h1
              style={{
                textAlign: 'center',
                color: 'darkblue',
                marginTop: '25px',
              }}
            >
              My Bookings
            </h1>
            <div className='container'>{mybookings}</div>

            <div className='container' id='similar'>
              {otherbookings}
            </div>
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

export default connect(mapStateToProps, null)(MyBooking);
