import {combineReducers} from 'redux';

import {MessageTypes} from 'spacenet-redux/action-types';

function messages(state = {}, action) {
  switch(action.type) {
    case MessageTypes.RECEIVED_MESSAGE: {
      const data = action.data || action.payload;
      const message = {...data};

      let nextMsgsForRoom;
      const messagesForRoom = state[message.streamId]

      if (!messagesForRoom) {
        // Don't save newly created posts until the channel has been loaded
        nextMsgsForRoom = []
      } else {
        nextMsgsForRoom = [...messagesForRoom]
      }

      nextMsgsForRoom.push(message)

      return {
        ...state,
        [message.streamId]: nextMsgsForRoom
      }
    }
    case MessageTypes.RECEIVED_MESSAGES_IN_STREAM: {
      const data = action.data || action.payload;
      const messages = {...data};
      const streamId = action.streamId

      return {
        ...state,
        [streamId]: messages,
      }
    }
    default:
      return state;
  }
}

export default combineReducers({
  messages,
})