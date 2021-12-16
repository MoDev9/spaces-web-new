import React from 'react';

import attach_file_svg from '../stream_view/attach_file_white_24dp.svg';
import user_avatar from '../stream_view/default-user-image.png';

export default class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streamId: this.props.streamId,
      // currentRoomId: this.props.currentRoomId,
    };

    this.postRef = React.createRef();
  }

  handleKeyPress = (e) => {
    if(e.keyCode == 13){
      this.sendMessage()
    }
  }

  sendMessage = () => {
    if (!this.props.streamId || Object.keys(this.props.streamId).length === 0) {
      return
    }

    const message = this.postRef.current.value.trim();

    if (message) {
      const msg = {
        content: message,
        streamId: this.props.streamId,
      }
      this.props.actions.createMessage(msg).then((result) => {
      })
    }
  }

  render() {
    return (
      <div className='sv_MsgComposer_Wrapper'>
        <div>
          <img className='avatar-3uk item-avatar' width='25px' src={user_avatar}/>
        </div>
        
          <input
            className='size14xv sv_MsgComposer'
            type='text'
            ref={this.postRef}
            placeholder='Send a message'
            onKeyDown={this.handleKeyPress}
          />
        
        <div className='sv_MsgComposer_actions clickable-3wh'>
          <img src={attach_file_svg}/>
        </div>
      </div>
    );
  }
}