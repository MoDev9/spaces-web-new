import React from 'react';
import * as Utils from 'utils/utils'
import browserHistory from  'utils/history';
import {Errors} from 'spacenet-redux/constants'

import 'components/login/login.css'

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serverError: null,
      loading: false,
    };
  }

  handleChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    })
  }

  handleChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    })
  }
  
  handleChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    })
  }

  preSignup = (e) => {
    e.preventDefault();

    let email = this.state.email;
    let username = this.state.username;
    let password = this.state.password;

    if(!email || !password || !username) {
      this.setState({serverError: "Please enter your register details"})
      return;
    }

    email = email.trim().toLowerCase();
    username = username.trim();

    const user = {
      email,
      username,
      password,
    }
    this.signup(user);
  }

  signup = (user) => {
    this.setState({
      serverError: null, loading: true
    });

    this.props.actions.createUser(user).then((result) => {
      if ('error' in result) {
        this.setState({
          loading: false,
          serverError: "Error creating an account. Please try again."
        });
        return;
      }

      this.finishSignup(user, result.data)
    });
  }

  finishSignup = (user, data) => {
    this.props.actions.login(user.email, user.password).then(({error}) => {
      if (error) {
        this.setState({serverError: error.message, loading: false});
        return;
      }
      
      Utils.setCSRFFromCookie();
      browserHistory.push('/streams/@me');
    });
  }

  render() {
    let classError = ' hideme'
    if (this.state.serverError) {
      classError = ''
    }

    return (
      <div className='sn_login_parent'>
        {/* <header>
        <div class="page-header">
          <a class="logo" href="home" >SPACENET</a>
          <div class="div-list">
            <ol>
              <li>About</li>
              <li>Home</li>
            </ol>
          </div>
        </div>
        </header> */}
        <main>
          <div className='sn-div-main'>
            <div class='sn-login-logo'>
              <span>SpaceNet</span>
            </div>
            <div class="login-or-register">
            {/* <h2 class="sign-in">Create an account</h2> */}
              <form onSubmit={this.preSignup}>
                <div id="error-msg" class={'alert-error' + classError}>{this.state.serverError}</div>
                {/* <label for="email">Email</label> */}
                <input 
                  class="form-input" 
                  type="email" 
                  name="email" 
                  id="email"
                  placeholder='Email'
                  value={this.state.email} 
                  onChange={this.handleChangeEmail}
                  spellCheck='false'
                  autoCapitalize='off'
                  autoFocus={true} />
                {/* <label for="username">Username</label> */}
                <input 
                  class="form-input" 
                  type="text" 
                  name="username" 
                  id="username"
                  placeholder='Username'
                  value={this.state.username} 
                  onChange={this.handleChangeUsername}
                  spellCheck='false'
                  autoCapitalize='off'
                  autoFocus={true} />
                {/* <label for="password">Password</label> */}
                <input 
                  class="form-input" 
                  type="password" 
                  name="password" 
                  id="password" 
                  placeholder='Password'
                  value={this.state.password}
                  onChange={this.handleChangePassword}
                  spellCheck='false'
                  />
                <input class="btn btn-primary form-submit" type="submit" value="Sign up" />
                <span>Already a member of SpaceNet? <a class="forgot-password" href="/login">Click here to sign in</a></span>
              </form>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
