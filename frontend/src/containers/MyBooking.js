import React, { Component } from 'react';
import axios from 'axios';
import { getConfig } from '../utils/getConfig';
import { Link } from 'react-router-dom';
import { ErrorHandler } from '../utils/ErrorHandler';
import NotAuthorizedPage from '../components/NotAuthorizedPage';
import { connect } from 'react-redux';
import { Row, Col,Card } from 'antd';
import '../static/Booking.css';
import UpdateBooking from '../components/UpdateBooking';
import DeleteBooking from '../components/DeleteBooking';
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
    const others=this.state.children; 
    

    mybookings = (
      <div>
        <Row>
          {arr.map((booking) => {
             let curr_date_string=booking.date.split("-");
             let curr_date=[]; 
             for(let i=0;i<3;i++){
               let temp=parseInt(curr_date_string[i],10); 
                curr_date.push(temp); 
             } 
 
             let curr_time=[]; 
             let curr_time_string=booking.time.split(":"); 
             for(let i=0;i<3;i++){
               let temp=parseInt(curr_time_string[i],10); 
                curr_time.push(temp); 
             } 
 
             let curr_location=booking.location; 
 
            
             let username=[];
             for(let i=0;i<Object.keys(others).length;i++){
              let other=others[i];
              if(curr_location===other.location)
              {
                let date_string=other.date.split("-");
                let date_int=[];
                for(let i=0;i<3;i++){
                   let temp=parseInt(date_string[i],10); 
                   date_int.push(temp); 
                } 

                if(   (date_int[0]===curr_date[0] && date_int[1]===curr_date[1] && date_int[2]===curr_date[2])
                   || (date_int[0]-curr_date[0]===1 && curr_date[1]-date_int[1]===11 && curr_date[2]-date_int[2]===30)
                   || (date_int[0]-curr_date[0]===-1 && curr_date[1]-date_int[1]===-11 && curr_date[2]-date_int[2]===-30)
                   || (curr_date[2]===31 && date_int[2]===1)
                   || (date_int[2]===31 && curr_date[2]===1)
                   || (curr_date[2]===30 &&(curr_date[1]===4 || curr_date[1]===4  ||curr_date[1]===6 || curr_date[1]===9 || curr_date[1]===11) && date_int[2]===1)
                   || (date_int[2]===30 &&(date_int[1]===4 || date_int[1]===4  ||date_int[1]===6 || date_int[1]===9 || date_int[1]===11)) && curr_date[2]===1 
                   || (curr_date[0]%4===0 && curr_date[0]%100!==0 && curr_date[1]===2 && curr_date[2]===29 && date_int[1]===3 && date_int[2]===1)
                   || (curr_date[0]%4===0 && curr_date[0]%100!==0 && date_int[1]===2 && date_int[2]===29 && curr_date[1]===3 && curr_date[2]===1)
                   || (curr_date[0]%4!==0 && curr_date[1]===2 && curr_date[2]===28 && date_int[1]===3 && date_int[2]===1)
                   || (curr_date[0]%4!==0 && date_int[1]===2 && date_int[2]===28 && curr_date[1]===3 && curr_date[2]===1)
                   || (curr_date[2]-date_int[2]===1 || curr_date[2]-date_int[2]===-1  )){
          

                   let time_string=other.time.split(":");
                   let time_int=[];
                   for(let i=0;i<3;i++){
                    let temp=parseInt(time_string[i],10); 
                     time_int.push(temp); 
                  } 

                  if(    (time_int[0]*60+time_int[1])-(curr_time[0]*60+curr_time[1])>-120 
                      || (time_int[0]*60+time_int[1])-(curr_time[0]*60+curr_time[1])<120 

                      || (time_int[0]===22 && (curr_time[0]===0 && curr_time[1]<=time_int[1]))
                      || (time_int[0]===22 && (curr_time[0]>19 && curr_time[1]>=time_int[1] ))
                      || (curr_time[0]===22 && (time_int[0]===0 && time_int[1]<=curr_time[1]))
                      || (curr_time[0]===22 && (time_int[0]>19 && time_int[1]>=curr_time[1])) 
                      
                      || (time_int[0]===23 && (curr_time[0]===1 && curr_time[1]<=time_int[1]))
                      || (time_int[0]===23 && (curr_time[0]>20 && curr_time[1]>=time_int[1] ))
                      || (curr_time[0]===23 && (time_int[0]===1 && time_int[1]<=curr_time[1]))
                      || (curr_time[0]===23 && (time_int[0]>20 && time_int[1]>=curr_time[1]))){
                      username.push(<p><Link to={"/users/"+other.user}>{other.user}</Link></p>); 
                  }
                  
                }
              }
               
            }
            
            if(username.length===0){
              username.push(<p>There are no matches yet</p>);
            }
            let title="Date:"+booking.date+"\n"+"Time:"+booking.time+"\n"+"Location:"+booking.location;
            return (
              <div>
              <Card title={title} style={{paddingLeft:'25px',paddingRight:"25px",paddingBottom:'25px'}}>
              <div style={{ display: 'inline-flex', textAlign: 'center',paddingBottom:'25px' }}>
                    <UpdateBooking booking_url={booking.booking_url} />
                    &nbsp;&nbsp;
                    <DeleteBooking booking_url={booking.booking_url} />
              </div>
                {username}
              </Card>
              </div>
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
