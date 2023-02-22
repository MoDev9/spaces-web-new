import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import * as Utils from 'utils/utils';

const ProtectedRoute = ({ component: Component, actions, currentUser, ...rest }) => {

  const isLoggedIn = Utils.isLoggedIn();
  
  return (
    <Routes>
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
            //return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            <Navigate replace to='/login'/>
          }
        }
      />
    </Routes>
  )
}

export default ProtectedRoute;