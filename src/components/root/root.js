import React from 'react';
import {Switch, Route, Redirect} from 'react-router';
import Login from 'components/login';
import {getSiteURL} from 'utils/general';
import {setUrl} from 'spacenet-redux/actions/general'

import Register from 'components/register';
import Home from 'components/home';
import NeedsSpace from 'components/needs_space';
import ProtectedRoute from 'components/protected';

export default class Root extends React.PureComponent {
  constructor(props) {
    super(props)
    setUrl(getSiteURL())
    // setUrl('http://localhost:8080')
  }

  render() {
    return (
      <Switch>
        <Route path='/login' component={Login} />
        <Route 
          path='/register' 
          component={Register}             
        />
        
        <Route 
          path='/streams' 
          component={NeedsSpace}
        />

        <Redirect to={{
            ...this.props.location,
            pathname: '/login',
          }} 
        />
      </Switch>
    );
  } 
};