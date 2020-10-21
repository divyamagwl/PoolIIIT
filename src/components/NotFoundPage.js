import React, { Component } from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';


class NotFoundPage extends Component {
    render() {
        return (
            <div>
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={<Button type="primary"><Link to="/">Back Home</Link></Button>}
                />
            </div>
        );
    }
}
export default NotFoundPage;