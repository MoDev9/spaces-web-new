import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import StreamView from "./stream_view";

import { createMessage } from "spacenet-redux/actions/messages";

import { getMessages } from "spacenet-redux/selectors/entities/messages";
import { getMembersInStream } from "spacenet-redux/selectors/entities/common";

import { getUserTyping } from "spacenet-redux/selectors/entities/typing";

const mapStatetoProps = (state, ownProps) => {
  const streamId = ownProps.id
  
  return {
    messagesList: getMessages(state, streamId),
    streamMembers: getMembersInStream(state, streamId),
    //streamId: streamId,
    userTyping: getUserTyping(state, streamId),
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    createMessage,
  }, dispatch),
});

export default connect(mapStatetoProps, mapDispatchToProps)(StreamView);