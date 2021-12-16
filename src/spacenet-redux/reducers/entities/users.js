import {combineReducers} from 'redux';

import {UserTypes} from 'spacenet-redux/action-types';
import { userListToMap } from 'spacenet-redux/utils/user_utils';
import { streamListToMap } from 'spacenet-redux/utils/stream_utils';

function currentUserId(state = '', action) {
  switch (action.type) {
    case UserTypes.RECEIVED_ME: {
      const data = action.data || action.payload;
      
      return data.id;
    }

    case UserTypes.LOGOUT_SUCCESS: {
      return '';
    }
    default:
      return state;
  }
}

function currentRoomId(state = '', action) {
  switch (action.type) {
    case UserTypes.CHANGE_ROOM_REQUEST: {
      const data = action.data || action.payload;
      
      return data.id;
    }

    default:
      return state;
  }
}

function rooms(state = {}, action) {
  switch(action.type) {
    case UserTypes.RECEIVED_ROOMS_LIST:
      return Object.assign({}, state, streamListToMap(action.data));
    
    case UserTypes.RECEIVED_ROOM:
      const data = action.data || action.payload;
      const stream = {...data};

      return {
        ...state,
        [data.id]: stream,
      };
      
    default:
      return state;
  }
}

function friends(state = {}, action) {
  switch(action.type) {
    case UserTypes.RECEIVED_FRIENDS_LIST:
      return Object.assign({}, state, userListToMap(action.data));
    
    case UserTypes.RECEIVED_FRIEND:
      const data = action.data || action.payload
      const user = {...data};

      return {
        ...state,
        [data.id]: user,
      }; 

    default:
      return state;
  }
}

function profiles(state = {}, action) {
  switch (action.type) {
    case UserTypes.RECEIVED_ME: 
    case UserTypes.RECEIVED_PROFILE: {
      const data = action.data || action.payload;
      const user = {...data};

      return {
        ...state,
        [data.id]: user,
      };
    }

    case UserTypes.RECEIVED_PROFILES: {
      const data = action.data || action.payload;
      const user = {...data};

      return {
        ...state,
        [data.id]: user,
      };
    }

    case UserTypes.LOGOUT_SUCCESS: {
      return '';
    }
    default:
      return state;
  }
}



export default combineReducers({
  // the current selected user
  currentUserId,

  currentRoomId,
  // object where every key is a user id and has an object with the users details
  profiles,

  friends,

  rooms,
});