import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { createMessage } from "spacenet-redux/actions/messages";

import { getCurrentUser } from 'spacenet-redux/selectors/entities/common';
// import { getCurrentRoomId } from 'spacenet-redux/selectors/entities/common';
// import { getUserTyping } from "spacenet-redux/selectors/entities/typing";

import CreatePost from "./create_post";

const mapStatetoProps = (state, ownProps) => {
  const currentUser = getCurrentUser(state);
  // const streamId = ownProps.streamId
  // const currentRoomId = getCurrentRoomId(state);

  return {
    currentUser,
    streamId: ownProps.id,
    // userTyping: getUserTyping(state, streamId)
    // currentRoomId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    createMessage,
  }, dispatch),
});

export default connect(mapStatetoProps, mapDispatchToProps)(CreatePost);