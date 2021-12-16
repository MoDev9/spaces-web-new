import { createSelector } from 'reselect';
import {
  getCurrentStreamId,
  getCurrentUser,
  getCurrentUserId,
  getMyCurrentstreamMembership,
  getUsers,
  getMembersInSpace,
  getMembersInStream,
} from 'spacenet-redux/selectors/entities/common';

export function getUserSessions(state) {
  return state.entities.users.mySessions;
}

export function getUser(state, id) {
  return state.entities.users.profiles[id];
}

export function getFriends(state) {
  return state.entities.users.friends;
}

export function getMyRooms(state) {
  return state.entities.users.rooms;
}

export function getFriendsByStatus(state, status) {
  
}

export const getUsersByUsername = createSelector(
  getUsers,
  (users) => {
      const usersByUsername = {};

      for (const id in users) {
          if (users.hasOwnProperty(id)) {
              const user = users[id];
              usersByUsername[user.username] = user;
          }
      }

      return usersByUsername;
  },
);

export function getUserByUsername(state, username) {
  return getUsersByUsername(state)[username];
}

export const getUsersByEmail = createSelector(
  getUsers,
  (users) => {
      const usersByEmail = {};

      for (const user of Object.keys(users).map((key) => users[key])) {
          usersByEmail[user.email] = user;
      }

      return usersByEmail;
  },
);

export function getUserByEmail(state, email) {
  return getUsersByEmail(state)[email];
}