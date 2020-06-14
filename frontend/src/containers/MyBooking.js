import React, { Component } from 'react';
import axios from 'axios';
import { getConfig } from '../utils/getConfig';
import { Link } from 'react-router-dom';
import { ErrorHandler } from '../utils/ErrorHandler';
import NotAuthorizedPage from '../components/NotAuthorizedPage';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import '../static/Booking.css';
class MyBooking extends Component {
  state = {
    user: [],
    children: [],
    error: null,
  };

  FilteredDisplay = (temp) => {
    for (let i = 0; i < temp.length; i++) {
      const id = temp[i].id;
      axios
        .get(`http://127.0.0.1:8000/booking/${id}/`, getConfig())
        .then((res) => {
          this.setState({
            children: this.state.children.concat(res.data),
          });
        })
        .catch((err) => {
          this.setState({
            error: ErrorHandler(err),
          });
          console.log(err);
        });
    }
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
        const temp = res.data;
        this.FilteredDisplay(temp);
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
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    );
    let otherbookings = null;
    const otherarr = this.state.children;
    otherbookings = (
      <div>
        <Row>
          {otherarr.map((booking) => {
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
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    );
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

            <h1 style={{ color: 'darkblue', textAlign: 'center' }}>
              Bookings with similar timings
            </h1>
            <div className='container'>{otherbookings}</div>
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
