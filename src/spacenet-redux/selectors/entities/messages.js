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

export function getMessages(state, streamId) {
  return state.entities.messages.messages[streamId];
}