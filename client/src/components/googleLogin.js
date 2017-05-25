import React from 'react';
import axios from 'axios'
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { googleAuthLogin } from '../actions/loginAction';

class Login extends React.Component{
  responseGoogle (response) {
    if(response.profileObj){
      axios.post('/login-google', response.profileObj).then(function(response){
          this.props.googleAuthLogin(response.data)
      }.bind(this))
    }else{
      throw response
    }
  }
  render () {
    return (
      <div>
        <GoogleLogin
          clientId='99513598536-f11d04t9vuil18atg0u72omg5k3p8elo.apps.googleusercontent.com'
          tag='p'
          style={{all: 'inherit'}}
          buttonText="Login"
          onSuccess={this.responseGoogle.bind(this)}
          onFailure={this.responseGoogle.bind(this)}
        />
      </div>
    );
  }
}

export default connect(null, { googleAuthLogin })(Login);

// '99513598536-f11d04t9vuil18atg0u72omg5k3p8elo.apps.googleusercontent.com'  heroku
// '99513598536-p9btb20c1fhjb1hkh4io7r72o708s4kp.apps.googleusercontent.com' localhost8080