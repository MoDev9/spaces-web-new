import React from 'react';
import { Redirect, Route } from 'react-router';

import * as Utils from 'utils/utils';

const ProtectedRoute = ({ component: Component, actions, currentUser, ...rest }) => {

  const isLoggedIn = Utils.isLoggedIn();
  
  return (
    <Route 
      {...rest}
      render={ props => {
        if (isLoggedIn) {
          // if (!currentUser) {
          //   console.log('getting Current User');
          //   actions.getCurrentProfile();
          // }

          return <Component {...props} />
        }
        else
          return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }
      }
    />
  )
}

export default ProtectedRoute;