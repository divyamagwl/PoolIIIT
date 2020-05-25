import React, { Component } from 'react'
import { connect } from 'react-redux';

class Home extends Component {
    render() {
        return (
            <div>
                <div>
                    <h1>Welcome to PoolIIIT <b>{this.props.username}</b> !!</h1>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.username
    }
}

export default connect(mapStateToProps, null)(Home);
