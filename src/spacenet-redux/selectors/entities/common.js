import { createSelector } from "reselect";

// Users

export function getCurrentUser(state) {
  return state.entities.users.profiles[getCurrentUserId(state)];
}

export function getCurrentUserId(state) {
  return state.entities.users.currentUserId;
}

export function getCurrentRoomId(state) {
  return state.entities.users.currentRoomId;
}

export function getUsers(state) {
  return state.entities.users.profiles;
}

// Streams

export function getCurrentStreamId(state) {
  return state.entities.streams.currentStreamId;
}

export function getMembersInStream(state, streamId) {
  return state.entities.streams.membersInStream[streamId] || {};
}

export function getMyStreamMemberships(state) {
  return state.entities.streams.myMembers;
}

export const getMyCurrentstreamMembership = createSelector(
  getCurrentStreamId,
  getMyStreamMemberships,
  (currentStreamId, streamMemberships) => {
    return streamMemberships[currentStreamId];
  },
);

// Spaces

export function getMembersInSpace(state, spaceId) {
  return state.entities.spaces.membersInspace[spaceId] || {};
}