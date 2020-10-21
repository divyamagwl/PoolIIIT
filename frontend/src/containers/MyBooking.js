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
import { Card } from 'react-bootstrap';

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
    window.scrollTo(0, 0);
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
                <Card
                  border='primary'
                  bg='light'
                  style={{ maxWidth: '20rem', maxHeight: '20rem' }}
                >
                  <Card.Body
                    style={{ paddingTop: '0px', paddingBottom: '0px' }}
                  >
                    <Card.Title>
                      <Link to={'/users/' + booking.user}>{booking.user}</Link>
                    </Card.Title>
                    <Card.Text style={{ color: 'darkblue' }}>
                      <b>Date: </b>
                      {booking.date}
                    </Card.Text>
                    <Card.Text style={{ color: 'darkblue' }}>
                      <b>Time: </b> {booking.time}
                    </Card.Text>
                    <Card.Text style={{ color: 'darkblue' }}>
                      <b>Location: </b> {booking.location}
                    </Card.Text>
                    <div
                      style={{ display: 'inline-flex', textAlign: 'center' }}
                    >
                      <UpdateBooking booking_url={booking.booking_url} />
                      &nbsp;&nbsp;
                      <DeleteBooking booking_url={booking.booking_url} />
                      &nbsp;&nbsp;
                    </div>
                    {/* <br /> */}
                    <Button
                      type='primary'
                      size='large'
                      style={{
                        marginTop: '10px',
                        marginBottom: '0',
                        paddingBottom: '0',
                      }}
                      onClick={() => this.FilteredDisplay(booking)}
                    >
                      View Similar
                    </Button>
                  </Card.Body>
                </Card>
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
                    <Card
                      border='primary'
                      bg='light'
                      style={{ width: '18rem' }}
                    >
                      <Card.Body>
                        <Card.Title>
                          <Link to={'/users/' + booking.user}>
                            {booking.user}
                          </Link>
                        </Card.Title>
                        <Card.Text style={{ color: 'darkblue' }}>
                          <b>Date: </b>
                          {booking.date}
                        </Card.Text>
                        <Card.Text style={{ color: 'darkblue' }}>
                          <b>Time: </b> {booking.time}
                        </Card.Text>
                        <Card.Text style={{ color: 'darkblue' }}>
                          <b>Location: </b> {booking.location}
                        </Card.Text>
                      </Card.Body>
                    </Card>
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
