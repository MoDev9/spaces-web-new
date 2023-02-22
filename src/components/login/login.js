import React from 'react';
import * as Utils from 'utils/utils'
import browserHistory from  'utils/history';
import {Errors} from 'spacenet-redux/constants'
import { Link } from 'react-router-dom';

import './login.css'

export default class Login extends React.Component {
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
  
  handleChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    })
  }

  preSubmit = (e) => {
    e.preventDefault();

    let email = this.state.email;
    let password = this.state.password;
    
    if(!email || !password) {
      this.setState({serverError: "Please enter your email and/or password"})
      return;
    }

    email = email.trim().toLowerCase();

    this.submit(email, password);
  }

  componentDidMount() {
    if (Utils.isLoggedIn()) {
      browserHistory.push('/streams')
    }
  }

  submit = (email, password) => {
    this.setState({
      serverError: null, loading: true
    });

    this.props.actions.login(email, password).then(({error}) => {
      if (error) {
        if (error.app_err_code == Errors.ERROR_INVALID_LOGIN_CRED) {
          this.setState({
            loading: false, 
            serverError: 'Incorrect email or password. Enter your sign in information again, or request an email to gain access to your account.'
          });
        }
        else {
          this.setState({serverError: error.message, loading: false});
        }
        return;
      }

      this.finishLogin()
    });
  }

  finishLogin = () => {
    Utils.setCSRFFromCookie();

    this.props.actions.getDefaultStream().then((result) => {
      if ('error' in result) {
      } else {
        //this.finishSignup(user, result.data)
        const stream = result.data;
        browserHistory.push(`/streams/@me/${stream.id}`)
        return
      }
    });

    browserHistory.push('/streams')
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
            {/* <h2 class="sign-in">Sign In</h2> */}
            <form onSubmit={this.preSubmit}>
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
              <Link class="forgot-password" to="/forgot_password">Forgot password?</Link>
              <button class="btn btn-primary form-submit" type="submit">Login</button>
              <span>New to SpaceNet? <Link class="forgot-password" to="/register">Sign up</Link></span>
            </form>
          </div>

          </div>
        </main>
      </div>
    );
  }
}
