import Client from 'spacenet-redux/client';
import { MessageTypes } from 'spacenet-redux/action-types';
//import { UserTypes } from 'spacenet-redux/action-types';
import { bindClientFunc } from './helpers';

export function receivedMessage(message) {
  return {
      type: MessageTypes.RECEIVED_MESSAGE,
      data: message,
  };
}

export function receivedMessages(messages, streamId) {
  return {
      type: MessageTypes.RECEIVED_MESSAGES_IN_STREAM,
      streamId,
      data: messages,
  };
}

export function loadMessagesForStream(streamId) {
  return async(dispatch, getState) => {
    //let messages;

    try {
      const messages = await Client.getMessagesForStream(streamId)

      dispatch(receivedMessages(messages, streamId))
    } catch(err) {
      dispatch({
        type: MessageTypes.RECEIVED_MESSAGES_IN_STREAM_FAILURE,
        err,
      })
    }

    return {data: true}
  }
}

export function createMessage(message) {
  return async(dispatch, getState) => {
    const timestamp = Math.round(Date.now() / 1000);

    let newMsg = {
      ...message,
      createdAt: timestamp,
      updatedAt: timestamp,
    }

    try {
      const created = await Client.createMessage(newMsg);

      dispatch(receivedMessage(created));
      return {data: created};
    }
    catch(error) {
      const data = {
        ...newMsg,
        updatedAt: Math.round(Date.now() / 1000),
      }

      dispatch({
        type: MessageTypes.CREATE_MESSAGE_FAILURE,
        error,
      });

      return {error};
    }

    
  }
}