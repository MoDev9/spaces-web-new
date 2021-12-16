import {combineReducers} from 'redux';

import {SpaceTypes} from 'spacenet-redux/action-types';
import { spaceListToMap } from 'spacenet-redux/utils/teams_list';

function spaces(state = {}, action) {
  switch (action) {
    case SpaceTypes.RECEIVED_SPACES_LIST:  
      return Object.assign({}, state, spaceListToMap(action.data));
  
    default:
      return state;
  }
}

export default combineReducers({
  spaces,
});