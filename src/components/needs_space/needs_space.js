import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

import Home from 'components/home';
import { TestComp } from 'components/test_component';
import StreamController from 'components/stream_layout/stream_controller';

const Simple = (props) => (
  <div>
    <h1>Hello World</h1>
  </div>
);

export default class NeedsSpace extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Routes>
        <Route 
            path={'/streams/@me/:id'}
            render={(props) => <Home {...props}/>}
        />
        <Route 
            path={'/streams/@me'}
            component={TestComp}
            // component={Home}
        />
        <Route 
          path='/streams/:space'
          render={(renderProps) => (
            <StreamController 
              pathName={renderProps.location.pathname}
            />
          )}
        />
        <Navigate replace to='/streams/@me'/>
        {/* <Redirect
          to='/streams/@me'
          /> */}
      </Routes>
    );
  }
}