import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            backgroundColor: '#ffffff',
            opacity: '0.9',
            width: '30%',
            height: '40%',
            display: 'inline-block',
            paddingTop: '10px',
            paddingBottom: '50px',
            color: 'black',
            border: '2px solid #000000',
          }}
        >
          <h1
            style={{
              color: '#1b4ca8',
              textAlign: 'center',
              marginTop: '100px',
              fontFamily: '"Times New Roman", Times, serif',
              fontSize: '40px',
              display: 'inline-block',
            }}
          >
            Welcome to Pool IIIT! <br />
            <h4 style={{ fontFamily: 'comic-sans' }}>{this.props.username}</h4>
          </h1>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
  };
};

export default connect(mapStateToProps, null)(Home);
