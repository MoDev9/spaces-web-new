import Client from 'spacenet-redux/client';
import { SpaceTypes } from 'spacenet-redux/action-types';
import { bindClientFunc } from './helpers';

export function getMySpaces() {
  return bindClientFunc({
    clientFunc: Client.getMySpaces,
    onRequest: SpaceTypes.MY_SPACES_REQUEST,
    onSuccess: [SpaceTypes.RECEIVED_SPACES_LIST, SpaceTypes.MY_SPACES_SUCCESS],
    onFailure: SpaceTypes.MY_SPACES_FAILURE,
  });
}

export function getSpace(spaceId) {
  return bindClientFunc({
    clientFunc: Client.getSpace(spaceId),
    onSuccess: SpaceTypes.RECEIVED_SPACE,
    params:[
      spaceId,
    ],
  });
}

export function getHome() {
  return bindClientFunc({
    clientFunc: Client.getHome,
    onRequest: SpaceTypes.MY_SPACES_REQUEST,
    onSuccess: [SpaceTypes.RECEIVED_SPACES_LIST, SpaceTypes.MY_SPACES_SUCCESS],
    onFailure: SpaceTypes.MY_SPACES_FAILURE,
  });
}