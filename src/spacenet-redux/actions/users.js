import Client from 'spacenet-redux/client';
import {StreamTypes, UserTypes} from 'spacenet-redux/action-types';
import { bindClientFunc } from './helpers';
import * as Utils from 'utils/utils'

import { getMySpaces } from './spaces';
import { getMyRooms } from 'spacenet-redux/selectors/entities/users';

export function createUser(user) {
  return async (dispatch, getState) => {
    let createdUser;

    try {
      createdUser = await Client.createUser(user);
    } catch (error) {
      dispatch({
        type: UserTypes.CREATE_USER_FAILURE, 
        error,
      });
      return {error};
    }
    
    return {data: createdUser};
  };
}

export function getDefaultStream() {
  return async (dispatch, getState) => {
    let stream;
    try {
      stream = await Client.getDefaultStream()
    } catch (error) {
      return {error}
    }

    return {data: stream}
  }
}

export function getPrivateStreams() {
  return async (dispatch, getState) => {
    let rooms;
    try {
      rooms = await Client.getRooms()
    } catch(error) {
      dispatch({
        type: StreamTypes.GET_STREAMS_FAILURE, 
        error,
      });
      dispatch({
        type: UserTypes.LOGIN_FAILURE, 
        error,
      });
      return {error};
    }

    return {data: rooms};
  }
}

export function login(email, password) {
  return async (dispatch, getState) => {
    dispatch({type: UserTypes.LOGIN_REQUEST, data: null});
    let result;

    try {
      result = await Client.login(email, password);
    } catch (error) {
      dispatch({
        type: UserTypes.LOGIN_FAILURE, 
        error,
      });
      return {error};
    }

    return completeLogin(result.data, result.headers)(dispatch, getState)
  };
}

export function changeRoom(roomId) {
  return async (dispatch, getState) => {
    dispatch({
      type: UserTypes.CHANGE_ROOM_REQUEST,
      data: {
        id: roomId,
      },
    })
  }
}

function completeLogin(data, headers) {
  return async (dispatch, getState) => {
    dispatch({
      type: UserTypes.RECEIVED_ME,
      data,
    });
  
    Client.setUserId(data.id);
    
    /* const token = headers.get("Token");
    if (token) {
      Utils.setSessionToken(token)
      Client.setToken(Utils.getSessionToken())
    } */
    
    /* const promises = [
      dispatch((getMySpaces)),
      // dispatch(getMyFriends()),
      // dispatch(getMyRooms()),
    ];

    try {
      await Promise.all(promises);
    } catch (error) {
      dispatch({type: UserTypes.LOGIN_FAILURE, error},);
      return {error};
    } */

    //dispatch(getRooms())

    let rooms;
    try {
      rooms = await Client.getRooms()
    } catch(error) {
      dispatch({
        type: StreamTypes.GET_STREAMS_FAILURE, 
        error,
      });
      dispatch({
        type: UserTypes.LOGIN_FAILURE, 
        error,
      });
      return {error};
    }

    dispatch({
      type: UserTypes.RECEIVED_ROOMS_LIST,
      data: rooms,
    })

    dispatch({
      type: UserTypes.LOGIN_SUCCESS,
    });

    return {data: true};
  };
}

export function addFriend(username) {
  return bindClientFunc({
    clientFunc: Client.addFriend,
    onRequest: UserTypes.ADD_FRIENDS_REQUEST,
    onSuccess: [UserTypes.RECEIVED_FRIEND, UserTypes.ADD_FRIENDS_SUCCESS],
    onFailure: UserTypes.ADD_FRIENDS_FAILURE,
    params: [
      username,
    ]
  });
}

export function getCurrentProfile() {
  return bindClientFunc({
    clientFunc: Client.getUser,
    onRequest: UserTypes.GET_USER_REQUEST,
    onSuccess: UserTypes.RECEIVED_ME,
    onFailure: UserTypes.GET_USER_FAILURE,
    params: [
      'me',
    ]
  });
}

export function getUser(userId) {
  return bindClientFunc({
    clientFunc: Client.getUser,
    onRequest: UserTypes.GET_USER_REQUEST,
    onSuccess: UserTypes.RECEIVED_PROFILE,
    onFailure: UserTypes.GET_USER_FAILURE,
    params: [
      userId,
    ]
  });
}

export function logout() {
  return bindClientFunc({
    clientFunc: Client.logout,
    onRequest: UserTypes.LOGOUT_REQUEST,
    onSuccess: [UserTypes.LOGOUT_SUCCESS],
    onFailure: UserTypes.LOGOUT_FAILURE,
  });
}

export function getRoom() {
  return bindClientFunc({
    clientFunc: Client.getRooms,
    onRequest: UserTypes.MY_ROOMS_REQUEST,
    onSuccess: [UserTypes.RECEIVED_ROOM, UserTypes.MY_ROOMS_SUCCESS],
    onFailure: UserTypes.MY_ROOMS_FAILURE,
  });
}

export function getRooms() {
  return bindClientFunc({
    clientFunc: Client.getRooms,
    onRequest: UserTypes.MY_ROOMS_REQUEST,
    onSuccess: [UserTypes.RECEIVED_ROOMS_LIST, UserTypes.MY_ROOMS_SUCCESS],
    onFailure: UserTypes.MY_ROOMS_FAILURE,
  });
}

export function getMyFriends() {
  return bindClientFunc({
    clientFunc: Client.getMyFriends,
    onRequest: UserTypes.MY_FRIENDS_REQUEST,
    onSuccess: [UserTypes.RECEIVED_FRIENDS_LIST, UserTypes.MY_FRIENDS_SUCCESS],
    onFailure: UserTypes.MY_FRIENDS_FAILURE,
  });
}
