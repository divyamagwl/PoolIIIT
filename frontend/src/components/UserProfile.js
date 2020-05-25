import React, { Component } from 'react'
import axios from "axios";
import { Button, Typography } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import NotAuthorizedPage from './NotAuthorizedPage';
import NotFoundPage from "./NotFoundPage"
import Loading from './Loading';
import { getConfig } from "../utils/getConfig";
import { USERS_URL } from '../api/constants';

const { Paragraph } = Typography;

const Page = (data) => {
    const {user, errorStatus, loading, username} = data

    if(loading)  return <Loading/> 

    if(errorStatus) {
        if(errorStatus === 404) return <NotFoundPage/>
        if(errorStatus === 401) return <NotAuthorizedPage/>
    }

    if(username === user.username) {
        return (
            <div>
                <h1 style={style}>Your Profile ({user.username})</h1>
                <h3>Name:</h3> <p>{user.first_name + " " + user.last_name} </p>
                <h3>Email:</h3> <p>{user.email}</p> 
                <h3>Phone number:</h3> <p>{user.phone} </p>
                <Button type="primary"><Link to={"/users/"+username+"/edit"}>Edit Profile</Link></Button>
            </div>
        )
    }

    return (
        <div>
            <h1 style={style}>{user.username}'s Profile</h1>
            <h3>Name:</h3> <p>{user.first_name + " " + user.last_name} </p>
            <h3>Email:</h3> <Paragraph copyable>{user.email}</Paragraph> 
            <h3>Phone number:</h3> <Paragraph copyable>{user.phone} </Paragraph>
        </div>
    );
}

class UserProfile extends Component {

    state = {
        user: [],
        loading: true,
        errorStatus: null
    };

    componentDidMount() {
        const uname = this.props.match.params.uname;
        axios.get(`${USERS_URL}/${uname}/`, getConfig())
            .then((res) => {
                this.setState({
                    user: res.data,
                    errorStatus: null,
                    loading: false,
                });
            })
            .catch((err) => {
                this.setState({
                    errorStatus: err.response.status,
                    loading: false,
                })
            });
    };

    componentDidUpdate(prevProps) {
        const uname = this.props.match.params.uname;
        if (uname !== prevProps.match.params.uname) {
        axios.get(`${USERS_URL}/${uname}/`, getConfig())
            .then((res) => {
                this.setState({
                    user: res.data,
                    errorStatus: null,
                    loading: false,
                });
            })
            .catch((err) => {
                this.setState({
                    errorStatus: err.response.status,
                    loading: false
                })
            });
        }
    }
    
    render() {
        return (
            <div>
                <Page {...this.state} {...this.props}/>
            </div>
        )
    }
}


const style = {
    textAlign: 'center'
}

const mapStateToProps = (state) => {
    return {
        username: state.username,
    }
}

export default connect(mapStateToProps, null)(UserProfile);
