import {createStore, applyMiddleware} from 'redux';
import rootReducer from 'spacenet-redux/reducers';
import thunk from 'redux-thunk';
import initialState from './initial_state';
// import middleware from './middleware';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

export default function configureStore() {
  const store = createStoreWithMiddleware(rootReducer, initialState);
  return store;
}