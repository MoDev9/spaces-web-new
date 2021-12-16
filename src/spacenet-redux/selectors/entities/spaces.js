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
import state from 'store/initial_state';

//export const getMySpaces = createSelector()

export function getSpaces(state) {
  return state.entities.spaces.spaces
}