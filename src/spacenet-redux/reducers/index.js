import {combineReducers} from 'redux';
import entities from './entities';
import requests from './requests';

export default combineReducers({
  entities,
  requests,
});