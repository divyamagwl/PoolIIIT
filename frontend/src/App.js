import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseRouter from './routes';

import './App.css';
import 'antd/dist/antd.css';

import MainLayout from './containers/MainLayout';
import { connect } from 'react-redux';
import * as actions from './actions/auth';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div>
        <Router>
          <MainLayout {...this.props}>
            <BaseRouter />
          </MainLayout>
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(null, mapDispatchToProps)(App);
