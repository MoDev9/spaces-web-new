import React from 'react';
import {Routes, Route, Navigate, Outlet} from 'react-router-dom';
import Login from 'components/login';
import {getSiteURL} from 'utils/general';
import {setUrl} from 'spacenet-redux/actions/general'

import Register from 'components/register';
import Home from 'components/home';
import NeedsSpace from 'components/needs_space';
import ProtectedRoute from 'components/protected';

const GuestLayout = () => {
  return (
    <div /* your crazy layout styling */ >
      <Outlet />
    </div>
  );
};

export default class Root extends React.PureComponent {
  constructor(props) {
    super(props)
    setUrl(getSiteURL())
  }

  render() {
    return (
      <Routes>
        <Route path='/' element={<GuestLayout />}/>
          <Route path='login' element={<Login />} />
          <Route 
            path='register' 
            element={<Register />}             
          />
          
          <Route 
            path='/streams' 
            component={NeedsSpace}
          />
          {/* <Route index element={<Login />}/> */}
          <Navigate replace to='/login'
            //...this.props.location,
              //pathname: '/login',
          />
      </Routes>
    );
  } 
};