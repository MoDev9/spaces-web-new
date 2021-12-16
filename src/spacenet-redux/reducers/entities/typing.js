import { WebSocketEvents } from "spacenet-redux/constants";

export default function typing(state = {}, action) {
  const {
    data,
    type,
  } = action;

  switch (type) {
    case WebSocketEvents.TYPING: {
        const {
            streamId,
            userId,
            now,
        } = data;

        if (streamId && userId) {
            return {
                ...state,
                [streamId]: userId,
            };
        }

        return state;
    }

    default:
      return state;
  }
}