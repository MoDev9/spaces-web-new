import Client from 'spacenet-redux/client';
import { StreamTypes } from 'spacenet-redux/action-types';
import { UserTypes } from 'spacenet-redux/action-types';
import { bindClientFunc } from './helpers';

export function receivedStreamMember(member) {
  return {
      type: StreamTypes.RECEIVED_STREAM_MEMBER,
      data: member,
  };
}

export function receivedStreamMembers(members, streamId) {
  return {
      type: StreamTypes.RECEIVED_STREAM_MEMBERS,
      streamId,
      data: members,
  };
}

export function getStreamMembers(streamId) {
  return async (dispatch, getState) => {
    let streamMembers;

    try {
      streamMembers = await Client.getStreamMembers(streamId)
    } catch (error) {
      return {error}
    }

    dispatch(receivedStreamMembers(streamMembers, streamId));

    return {data: streamMembers}
  }
}

export function getStreamsAndMembers(spaceId) {
  return async (dispatch, getState) => {
    dispatch({
      type: StreamTypes.STREAMS_REQUEST,
      data: null,
    });

    let streams;
    let spaceMembers;

    const state = getState();

    try {
      streams = await Client.getStreamsForSpace(spaceId);
      spaceMembers = await Client.getSpaceMembers(spaceId);
    } catch (error) {
      dispatch({type: StreamTypes.STREAMS_FAILURE, error});
      return {error}
    }

    const {currentUserId} = state.entities.users;
    const {currentStreamId} = state.entities.streams;

    dispatch({
      type: StreamTypes.RECEIVED_STREAMS,
      spaceId,
      data: streams,
      currentStreamId,
    });
  }
}

export function addMemberToStream(username, streamId) {
  return bindClientFunc({
    clientFunc: Client.addMemberToStream,
    onRequest: StreamTypes.ADD_MEMBER_TO_STREAM_REQUEST,
    onSuccess: [UserTypes.RECEIVED_PROFILE, StreamTypes.ADD_MEMBER_TO_STREAM_SUCCESS],
    onFailure: StreamTypes.ADD_MEMBER_TO_STREAM_FAILURE,
    params: [
      username,
      streamId,
    ]
  });
}

/* export function getStream(streamId) {
  return async (dispatch, getState) => {
    let createdStream;

    try {
      createdStream = await Client.createStream(stream);
    } catch (error) {
      dispatch({
        type: StreamTypes.CREATE_STREAM_FAILURE, 
        error,
      });
      return {error};
    }

    dispatch({
      type: UserTypes.RECEIVED_ROOM,
      data: createdStream,
    });
  
    dispatch({
      type: StreamTypes.CREATE_STREAM_SUCCESS,
    });

    return {data: createdStream};
  };
} */

export function createStream(stream) {
  return async (dispatch, getState) => {
    let createdStream;

    try {
      createdStream = await Client.createStream(stream);
    } catch (error) {
      dispatch({
        type: StreamTypes.CREATE_STREAM_FAILURE, 
        error,
      });
      return {error};
    }

    dispatch({
      type: UserTypes.RECEIVED_ROOM,
      data: createdStream,
    });
  
    dispatch({
      type: StreamTypes.CREATE_STREAM_SUCCESS,
    });

    return {data: createdStream};
  };
}