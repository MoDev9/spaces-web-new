import {combineReducers} from 'redux';

import { StreamTypes } from 'spacenet-redux/action-types';

function membersInStream(state = {}, action) {
  switch (action.type) {
    case StreamTypes.RECEIVED_STREAM_MEMBERS: {
      const data = action.data || action.payload;
      const streamMembers = {...data};
      const streamId = action.streamId

      return {
        ...state,
        [streamId]: streamMembers,
      }
    }

    case StreamTypes.RECEIVED_STREAM_MEMBER: {
      const data = action.data || action.payload;
      const streamMember = {...data};
      const streamId = action.streamId;

      let nextStreamMembers;
      const membersInStream = state[streamId]

      if (!membersInStream) {
        nextStreamMembers = []
      } else {
        nextStreamMembers = [...membersInStream]
      }

      nextStreamMembers.push(streamMember)

      return {
        ...state,
        [streamId]: nextStreamMembers,
      }
    }
    default:
      return state;
  }
}

export default combineReducers({
  membersInStream,
});