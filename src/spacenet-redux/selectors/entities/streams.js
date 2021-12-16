export function getStream(state, id) {
  return state.entities.streams.streams[id]
}

export function getMembersInStream(state, id) {
  return state.entities.streams.membersInStream[id]
}