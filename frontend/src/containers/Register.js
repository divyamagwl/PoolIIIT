import React, { Component } from "react"

import {
    Form,
    Input,
    Button
} from 'antd';

import { UserOutlined, LockOutlined, MailOutlined, MobileOutlined } from '@ant-design/icons';
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../actions/auth"
import { ErrorHandler } from "../utils/ErrorHandler"


class RegisterForm extends Component {
    

    onFinish = values => {
        this.props.onAuth(values.firstname, values.lastname, values.username, values.email, values.password, values.phone);
    };

    onAuthenticated = () => {
        this.props.history.push('/')
    }

    render() {
        if(this.props.isAuthenticated){
            this.onAuthenticated()
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{ErrorHandler(this.props.error)}</p>
            );
        }

        return (
            <div>
            <div>{errorMessage}</div>
            <Form
                name="register"
                onFinish={this.onFinish}
                scrollToFirstError
            >
                <Form.Item
                    name="firstname"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Firstname!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Firstname" />
                </Form.Item>

                <Form.Item
                    name="lastname"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Lastname!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Lastname" />
                </Form.Item>

                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
        
                <Form.Item
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email"/>
                </Form.Item>
        
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password 
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
        
                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
                    ]}
                >
                    <Input.Password 
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Confirm Password"
                    />
                </Form.Item>
        
                <Form.Item
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!',
                        },
                    ]}
                >
                    <Input
                        addonBefore={"+91"}
                        prefix={<MobileOutlined className="site-form-item-icon" />} 
                        style={{width: '100%'}} 
                        placeholder="Phone number"/>
                </Form.Item>

                <Form.Item>
                    <Button style= {{marginRight: "10px"}} type="primary" htmlType="submit">
                    Register
                    </Button>
                    Already have an account?  
                    <NavLink style= {{marginLeft: "5px"}} to= "/login/"> Login Here</NavLink>
                </Form.Item>
            </Form>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error,
        isAuthenticated: state.isAuthenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (firstname, lastname, username, email, password, phone) => dispatch(actions.authSignup(firstname, lastname, username, email, password, phone))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
