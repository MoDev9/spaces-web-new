import Home from './home';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import { createStream } from 'spacenet-redux/actions/streams';

//import { getRooms } from 'spacenet-redux/actions/users';
import { logout } from 'spacenet-redux/actions/users';
import { addMemberToStream } from 'spacenet-redux/actions/streams';
import { loadMessagesForStream } from 'spacenet-redux/actions/messages';
// import { getStreamsAndMembers } from 'spacenet-redux/actions/streams';
import { getStreamMembers } from 'spacenet-redux/actions/streams';

import { getMyRooms } from 'spacenet-redux/selectors/entities/users';
import { getCurrentUser } from 'spacenet-redux/selectors/entities/common';


const mapStatetoProps = (state, ownProps) => {
  const currentUser = getCurrentUser(state);
  return {
    currentUser,
    id: ownProps.match.params.id,
    //roomsList: getMyRooms(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    createStream,
    //getRooms,
    getStreamMembers,
    addMemberToStream,
    logout,
    loadMessagesForStream,
  }, dispatch),
});

export default connect(mapStatetoProps, mapDispatchToProps)(Home);
//export default Home;