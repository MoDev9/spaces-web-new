import React from 'react';
import {Redirect, Route, Switch} from 'react-router';

import Home from 'components/home';
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
      <Switch>
        <Route 
            path={'/streams/@me/:id'}
            render={(props) => <Home {...props}/>}
        />
        <Route 
            path={'/streams/@me'}
            component={Home}
        />
        <Route 
          path='/streams/:space'
          render={(renderProps) => (
            <StreamController 
              pathName={renderProps.location.pathname}
            />
          )}
        />

        <Redirect
          to='/streams/@me'
          />
      </Switch>
    );
  }
}