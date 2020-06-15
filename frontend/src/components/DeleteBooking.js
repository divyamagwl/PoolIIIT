import React, { Component } from 'react';

import { Button } from 'antd';
import axios from 'axios';
import { getConfig } from '../utils/getConfig';
import { ErrorHandler } from '../utils/ErrorHandler';
class DeleteBooking extends Component {
  delete = () => {
    axios
      .delete(this.props.booking_url, getConfig())
      .then((res) => console.log(res))
      .catch((err) => console.log(ErrorHandler(err)));
    window.location.reload(false);
  };
  render() {
    return (
      <div>
        <Button type='primary' size='large' onClick={this.delete} danger>
          Delete
        </Button>
      </div>
    );
  }
}

export default DeleteBooking;
