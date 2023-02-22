import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
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
      <Root />
    </Router>
  </Provider>
);

export default App;
