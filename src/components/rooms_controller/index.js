import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import Rooms from './rooms_controller';

import { getRooms } from 'spacenet-redux/actions/users';
import { getPrivateStreams } from 'spacenet-redux/actions/users';

import { getCurrentUser } from 'spacenet-redux/selectors/entities/common';
import { getMyRooms } from 'spacenet-redux/selectors/entities/users';
import { getFriends } from 'spacenet-redux/selectors/entities/users';

import { createStream } from 'spacenet-redux/actions/streams';

const mapStatetoProps = (state, ownProps) => {
  const currentUser = getCurrentUser(state);

  return {
    currentUser,
    id: ownProps.id,
    roomsList: getMyRooms(state),
    friendsList: getFriends(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    createStream,
    //getPrivateStreams,
    //getRooms,
  }, dispatch),
});

export default connect(mapStatetoProps, mapDispatchToProps)(Rooms);