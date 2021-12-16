import WebSocketClient from 'spacenet-redux/websocket_client'
import { MessageTypes } from 'spacenet-redux/action-types';
import { WebSocketEvents } from 'spacenet-redux/constants';

import store from 'stores/redux_store';

import { SocketEvents } from 'utils/constants';
import { getCurrentUserId } from 'spacenet-redux/selectors/entities/common';

const dispatch = store.dispatch;
const getState = store.getState;

export function initialize() {
  if (!window.WebSocket) {
    return;
  }

  const connUrl = 'ws://localhost:8080/api/websocket'

  WebSocketClient.setEventCallback(handleEvent)
  WebSocketClient.initialize(connUrl)
}

export function handleNewPostEvent(msg) {
  dispatch({
    type: MessageTypes.RECEIVED_MESSAGE,
    data: msg,
  });
}

export function handleEvent(msg) {
  switch (msg.event) {
    case SocketEvents.POSTED:
      handleNewPostEvent(msg)
      break;
    case SocketEvents.TYPING:
      dispatch(handleUserTypingEvent(msg));
      break;
    default:
  }
}

export function handleUserTypingEvent(msg) {
  return async (doDispatch, doGetState) => {
    const state = doGetState()
    const currentUserId = getCurrentUserId(state)

    const userId = msg.data.userId;

    const data = {
      streamId: msg.broadcast.streamId,
      userId,
      now: Date.now(),
    }

    doDispatch({
      type: WebSocketEvents.TYPING,
      data,
    });
  }
}