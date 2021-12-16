import React from 'react';
import {Router, Route} from 'react-router';
import {Provider} from 'react-redux';
import store from 'stores/redux_store'
import history from 'utils/history';
import Root from './components/root';

import './App.css';

window.store = store;
// let store = configureStore();

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={Root}/>
    </Router>
  </Provider>
);

export default App;
