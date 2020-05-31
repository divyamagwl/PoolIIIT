import React, { Component } from 'react';
import moment from 'moment';
import axios from "axios";

import { Form, DatePicker, TimePicker, Button } from 'antd';
import { BOOKING_URL } from "../api/constants";
import { getConfig } from "../utils/getConfig";
import { ErrorHandler } from "../utils/ErrorHandler";

const config = {
    rules: [
      {
        type: 'object',
        required: true,
        message: 'Please select time!',
      },
    ],
};  

const disabledDate = (current) => {
    return current && current < moment().startOf('day');
}

class BookingForm extends Component {
    
    state = {
        value: null,
    };
    
    onChange = time => {
        this.setState(prevState=>{
            return{
                 value: time
            }
        })
    }
    
    onFinish = fieldsValue => {
        const values = {
            ...fieldsValue,
            'date': fieldsValue['date'].format('YYYY-MM-DD'),
            'time': fieldsValue['time'].format('hh:mm a'),
            'flexibility_before': fieldsValue['flexibility-before'].format('HH:mm'),
            'flexibility_after': fieldsValue['flexibility-after'].format('HH:mm'),
        };

        axios.post(BOOKING_URL, {
            date: values.date,
            time: values.time,
            flexibility_before: values.flexibility_before,
            flexibility_after: values.flexibility_after
        }, getConfig())
            .then(res => console.log(res))
            .catch(err => console.log(ErrorHandler(err)));

        this.props.handleSubmit();
        window.location.reload(false) /*Reload Page*/
    };

    render() {
        return (
            <Form name="booking-form" onFinish={this.onFinish}>

                <Form.Item name="date" label="Date" {...config}>
                    <DatePicker disabledDate={disabledDate}/>
                </Form.Item>

                <Form.Item name="time" label="Time"  {...config}>
                    <TimePicker format="HH:mm" minuteStep={15} value={this.state.value} onChange={this.onChange}/>
                </Form.Item>

                <Form.Item name="flexibility-before" label="Flexibility Before" {...config}>
                    <TimePicker format="HH:mm" minuteStep={15} value={this.state.value} onChange={this.onChange}/>
                </Form.Item>

                <Form.Item name="flexibility-after" label="Flexibility After" {...config}>
                    <TimePicker format="HH:mm" minuteStep={15} value={this.state.value} onChange={this.onChange}/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default BookingForm;
