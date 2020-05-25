import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';

import { Layout, Menu, Breadcrumb, Affix } from 'antd';
import { connect } from "react-redux";

import * as actions from "../actions/auth";
import "../static/MainLayout.css";

const { Header, Content, Footer } = Layout;

const breadcrumbNameMap = {
    '/login'    : 'Login',
    '/register' : 'Register',
    '/booking'  : 'Booking',
    '/users'    : 'Users'
}

const BreadCrumbComponent = withRouter( props => {
    const { location } = props;
    const pathSnippets = location.pathname.split('/').filter(i => i);

    const extraBreadcrumbItems = pathSnippets.map( (_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{breadcrumbNameMap[url]}</Link>
            </Breadcrumb.Item>
        );
    });

    const breadcrumbItems = [
        <Breadcrumb.Item key="/">
            <Link to="/">Home</Link>
        </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);

    return (
      <div className="crumb">
        <Breadcrumb>{breadcrumbItems}</Breadcrumb>
      </div>
    );
});


  
const Location = withRouter( props => {
    const { location, logout, isAuthenticated, username } = props;
    
    return (
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        style={{ lineHeight: '64px', textAlign: 'right' }}
      >
        <Menu.Item key="/"><Link to="/">Home</Link></Menu.Item>
        {
            isAuthenticated ?
            [
                <Menu.Item key="/booking"><Link to="/booking">Bookings</Link></Menu.Item>,
                <Menu.Item key={"/users/"+username}>
                    <Link to={"/users/"+username}>My Profile</Link>
                </Menu.Item>,
                <Menu.Item key="/logout" onClick={logout}><Link to="/">Logout</Link></Menu.Item>
              ]
            :
            [
                <Menu.Item key="/login"><Link to="/login">Login</Link></Menu.Item>,
                <Menu.Item key="/register"><Link to="/register">Register</Link></Menu.Item>
            ]
        }
      </Menu>
    )
})


class MainLayout extends Component {
    render() {
        return (
            <div>
                <Layout className="layout">

                    <Affix offsetTop={0}>
                    <Header>
                        <div className="logo">
                            <h1 ><Link to="/" style={{ color: "inherit" }}>PoolIIIT</Link></h1>
                        </div>
                        <Location {...this.props}/>
                    </Header>
                    </Affix>

                    <Content style={{ padding: '0 50px' }}>
                        <BreadCrumbComponent />
                        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                            {this.props.children}
                        </div>
                    </Content>

                    <Footer style={{ textAlign: 'center' }}>Made by Zense</Footer>
                
                </Layout>                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.isAuthenticated,
        username: state.username,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainLayout));