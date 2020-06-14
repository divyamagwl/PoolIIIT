import React, { Component } from 'react';
import moment from 'moment';
import axios from "axios";

import { Form, DatePicker, TimePicker, Button, Select } from 'antd';
import { BOOKING_URL } from "../api/constants";
import { getConfig } from "../utils/getConfig";
import { ErrorHandler } from "../utils/ErrorHandler";

const { Option } = Select;

const disabledDate = (current) => {
    return current && current < moment().startOf('day');
}

class BookingForm extends Component {
    
    state = {
        value: null,
    };
    
    onChange = time => {
        this.setState({ value: time });
    };
    
    onFinish = fieldsValue => {
        const values = {
            ...fieldsValue,
            'date': fieldsValue['date'].format('YYYY-MM-DD'),
            'time': fieldsValue['time'].format('hh:mm a'),
            'location': fieldsValue['location'],
        };

        axios.post(BOOKING_URL, {
            date: values.date,
            time: values.time,
            location: values.location,
        }, getConfig())
            .then(res => console.log(res))
            .catch(err => console.log(ErrorHandler(err)));

        this.props.handleSubmit(); /*Close Modal*/
        window.location.reload(false) /*Reload Page*/
    };

    render() {
        return (
            <Form name="booking-form" onFinish={this.onFinish}>

                <Form.Item 
                    name="date" 
                    label="Date"
                    rules= {[
                        {
                            type: 'object',
                            required: true,
                            message: 'Please select date!',
                        },
                    ]}
                >
                    <DatePicker disabledDate={disabledDate}/>
                </Form.Item>

                <Form.Item 
                    name="time" 
                    label="Time" 
                    rules= {[
                        {
                            type: 'object',
                            required: true,
                            message: 'Please select time!',
                        },
                    ]}
                >
                    <TimePicker format="HH:mm" minuteStep={15} value={this.state.value} onChange={this.onChange}/>
                </Form.Item>

                <Form.Item 
                    name="location"
                    label="Location" 
                    rules= {[
                        {
                            required: true,
                            message: 'Please select your location!',
                        },
                    ]}
                >
                    <Select placeholder="Select your location">
                        <Option value="KIA">Kempegowda International Airport</Option>
                        <Option value="MBS">Majestic Bus Station</Option>
                        <Option value="KSR">Bangalore City Railway Station (Krantivira Sangolli Rayanna Railway Station)</Option>
                        <Option value="BCR">Bangalore Cantonment Railway Station</Option>
                        <Option value="YJR">Yeshwanthpur Junction Railway Station</Option>
                        <Option value="KPR">KR Puram Railway Station</Option>
                        <Option value="BMR">Baiyapanahalli Metro Station (Purple)</Option>
                        <Option value="MRM">Mysore Road Metro Station (Purple)</Option>
                        <Option value="NMS">Nagasandra Metro Station (Green)</Option>
                        <Option value="YMS">Yelanchenahalli Metro Station (Green)</Option>
                        <Option value="MMS">Majestic Metro Station (Green-Purple)</Option>
                    </Select>
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