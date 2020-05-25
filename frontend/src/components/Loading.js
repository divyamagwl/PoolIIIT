import React, { Component } from 'react'
import { Spin } from 'antd'

class Loading extends Component {
    render() {
        return (
            <div style={Load}>
                    <Spin size="large"/> 
            </div>
        )
    }
}

/* TODO: set styling properly */
const Load = {
    textAlign: 'center',
    borderRadius: '4px',
    marginBottom: '20px',
    padding: '30px 50px',
    margin: '20px 0',
}


export default Loading
