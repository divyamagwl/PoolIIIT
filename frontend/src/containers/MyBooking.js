import React, { Component } from 'react'
import axios from "axios";
import { Table } from 'antd';

import { getConfig } from "../utils/getConfig";
import { Link } from 'react-router-dom';

const { Column } = Table

class MyBooking extends Component {

  state = {
    user: [],
    children: [],
    error: null
  }

  FilteredDisplay = (temp) => {
    for (let i = 0; i < temp.length; i++) {
      const id = temp[i].id
      axios.get(`http://127.0.0.1:8000/booking/${id}/`, getConfig())
        .then((res) => {
          this.setState({
            children: this.state.children.concat(res.data),
          })
        })
        .catch((err) => {
          this.setState({
            error: err,
          })
          console.log(err)
        });
    }
  }

  componentDidMount() {
    const uname = this.props.match.params.uname;
    axios.get(`http://127.0.0.1:8000/users/${uname}/booking/`, getConfig())
      .then((res) => {
        this.setState({
          user: res.data,
        })
        const temp = res.data
        this.FilteredDisplay(temp)
      })
      .catch((err) => {
        this.setState({
          error: err,
        })
        console.log(err)
      });

    }

  render() {
    return (
      <div>
        <h1>My Bookings</h1>
        <Table dataSource={this.state.user} rowKey="id" pagination={false}>
          <Column title="Date" dataIndex="date" key="date" />
          <Column title="Time" dataIndex="time" key="time" />
          <Column
            title="Flexibility Before"
            dataIndex="flexibility_before"
            key="flexibility_before"
          />
          <Column
            title="Flexibility After"
            dataIndex="flexibility_after"
            key="flexibility_after"
          />
        </Table>

        <h1 style={{marginBlock: "20px"}}>Bookings with similar timings</h1>
        <Table dataSource={this.state.children} rowKey="id" pagination={false}>
          <Column title="User" dataIndex="user" key="user" 
            render={(text) => (
              <Link to={"../users/"+text}>{text}</Link>
            )}
          />
          <Column title="Date" dataIndex="date" key="date" />
          <Column title="Time" dataIndex="time" key="time" />
          <Column
            title="Flexibility Before"
            dataIndex="flexibility_before"
            key="flexibility_before"
          />
          <Column
            title="Flexibility After"
            dataIndex="flexibility_after"
            key="flexibility_after"
          />
        </Table>
      </div>
    )
  }
}


export default MyBooking
