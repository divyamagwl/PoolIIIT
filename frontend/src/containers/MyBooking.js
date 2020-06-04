import React, { Component } from 'react';
import axios from 'axios';
import { getConfig } from '../utils/getConfig';
import { Link } from 'react-router-dom';
import { ErrorHandler } from '../utils/ErrorHandler';
import NotAuthorizedPage from '../components/NotAuthorizedPage';
import { connect } from 'react-redux';
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
      <div style={{ textAlign: 'center' }}>
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
    let otherbookings = null;
    const otherarr = this.state.children;
    otherbookings = (
      <div style={{ textAlign: 'center' }}>
        <div className='row'>
          {otherarr.map((booking) => {
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
    const style = {
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
    };
    return (
      <div>
        {!this.props.isAuthenticated ? (
          <NotAuthorizedPage />
        ) : (
          <div>
            <div style={style}>
              <h1 style={{ color: 'darkblue' }}>My Bookings</h1>
              {mybookings}
            </div>
            <div style={style}>
              <h1 style={{ marginTop: '240px', color: 'darkblue' }}>
                Bookings with similar timings
              </h1>
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
