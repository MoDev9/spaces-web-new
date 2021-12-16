import WebSocketEvents from "spacenet-redux/constants/websocket";

export function getUserTyping(state, streamId) {
  return state.entities.typing[streamId];
}