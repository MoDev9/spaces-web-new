import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import StreamView from "./stream_view";

import { createMessage } from "spacenet-redux/actions/messages";

import { getMessages } from "spacenet-redux/selectors/entities/messages";
import { getMembersInStream } from "spacenet-redux/selectors/entities/common";

import { getUserTyping } from "spacenet-redux/selectors/entities/typing";

const mapStatetoProps = (state, ownProps) => {
  const mockMsgs = {
    "198282": {
      id: "198282",
      author: {
        username: 'Mohamed_YY'
      },
      authorId: "1",
      content: 'Everyone join ufc fight night. We have really good fights tonight',
      createdAt: '1628105295',
    },
    "182872": {
      id: "182872",
      author: {
        username: 'Mohamed_YY'
      },
      authorId: "1",
      content: 'Grammar doesn’t care about your pronunciation preferences',
      createdAt: '1628190662',
    },
    "228277": {
      id: "228277",
      author: {
        username: 'coolguy22'
      },
      authorId: "2",
      content: `I've said it before, and I am saying it again. We will win in Toronto.`,
      createdAt: '1628190767',
    },
  };
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