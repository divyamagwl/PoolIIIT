import React, { Component } from 'react';

import { Modal, Button } from "antd";
import BookingForm from "./BookingForm"

class AddBookingModal extends Component {

    state = { visible: false };
  
    showModal = () => {
      this.setState({
        visible: true,
      });
    };

    hideModal = () => {
      this.setState({
        visible: false,
      });
    };

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Add Booking
                </Button>
                <Modal
                    title="Add Booking"
                    visible={this.state.visible}
                    onCancel={this.hideModal}
                    footer={null}
                >
                <BookingForm handleSubmit={this.hideModal}/>
                </Modal>
            </div>
        );
    }
}


export default AddBookingModal