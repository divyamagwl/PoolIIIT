import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';
import axios from "axios";
import { getConfig } from "../utils/getConfig";
import Loading from './Loading';
import { USERS_URL } from '../api/constants';
import NotAuthorizedPage from './NotAuthorizedPage';
import { connect } from 'react-redux';


class EditProfile extends Component {

    state = {
        user: [],
        loading: true,
        errorStatus: null
    }

    componentDidMount() {
        const uname = this.props.match.params.uname;
        axios.get(`${USERS_URL}/${uname}/`, getConfig())
            .then((res) => {
                this.setState({
                    user: res.data,
                    loading: false,
                });
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    loading: false,
                    errorStatus: err.response.status,
                });
            });
    };

    onFinish = (values) => {
        const uname = this.props.match.params.uname;
        axios.put(`${USERS_URL}/${uname}/`,{
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            phone: values.phone,
        }, getConfig())
            .then((res) => {
                this.props.history.push("/users/"+uname)
            })
            .catch((err) => {
                console.log(err);
            });

    }

    render() {
        /* TODO: Properly shift it to functions */
        const notAuthorized = () => {
            if(this.state.user.username === this.props.username) {
                return false;
            }
            return true;
        }
        return (
            <div> 
            {
                this.state.loading ? <Loading/> :
                this.state.errorStatus ? <NotAuthorizedPage/> :
                notAuthorized() ? <NotAuthorizedPage/> :
                <Form
                    name="EditDetails"
                    layout="vertical"
                    initialValues={this.state.user}
                    onFinish={this.onFinish}
                >
                    <Form.Item
                        name="first_name"
                        label="First name"
                        rules={[
                            {
                                required: true,
                                message: 'First name is required!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="last_name"
                        label="Last name"
                        rules={[
                            {
                                required: true,
                                message: 'Last name is required!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
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
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Phone number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number!',
                            },
                        ]}
                    >
                    <Input/>
                    </Form.Item>

                    <Button type="primary" htmlType="submit">
                        Edit
                    </Button>
                </Form>
            }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.username,
    }
}

export default connect(mapStateToProps, null)(EditProfile);
