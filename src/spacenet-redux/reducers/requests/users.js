import {RequestStatus} from 'spacenet-redux/constants';
import {UserTypes} from 'spacenet-redux/action-types';
import { combineReducers } from 'redux';

import { initialRequestState, handleRequest } from './helpers';

function login(state = initialRequestState(), action) {
  switch (action.type) {
    case UserTypes.LOGIN_REQUEST: 
      return {...state, status: RequestStatus.STARTED};
    case UserTypes.LOGIN_SUCCESS: 
      return {...state, status: RequestStatus.SUCCESS, error: null}
    case UserTypes.LOGIN_FAILURE:
      return {...state, status: RequestStatus.FAILURE, error: action.error};
    case UserTypes.LOGOUT_SUCCESS:
      return {...state, status: RequestStatus.NOT_STARTED, error: null};

    default:
        return state;
    }
}

function getMyFriends(state = initialRequestState(), action) {
  return handleRequest(
    UserTypes.MY_FRIENDS_REQUEST,
    UserTypes.MY_FRIENDS_SUCCESS,
    UserTypes.MY_FRIENDS_FAILURE,
    state,
    action,
  );
}

function logout(state = initialRequestState(), action) {
  switch (action.type) {
  case UserTypes.LOGOUT_REQUEST:
      return {...state, status: RequestStatus.STARTED};

  case UserTypes.LOGOUT_SUCCESS:
      return {...state, status: RequestStatus.SUCCESS, error: null};

  case UserTypes.LOGOUT_FAILURE:
      return {...state, status: RequestStatus.FAILURE, error: action.error};

  case UserTypes.RESET_LOGOUT_STATE:
      return initialRequestState();

  default:
      return state;
  }
}

export default combineReducers({
  login,
  logout,
  getMyFriends,
});