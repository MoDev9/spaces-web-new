import React from 'react';

import user_avatar from './default-user-image.png';
import './message_view.css';

export default class MessageView extends React.Component {
  constructor(props) {
    super(props);
  
  }
  
  parseUnixTime = (time) => {
    const date = new Date(time * 1000);
    var hours = date.getHours();
    var ampm = hours >= 12 ? 'pm' : 'am';
    
    hours = hours % 12;
    hours = hours ? hours : 12;
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    var formattedTime = hours + ':' + minutes.substr(-2) + ampm;
  
    return formattedTime;
  };

  createMessageView = (message) => (
    <div className='sn_MessageView'>
      <div className='sn_Time_Wrapper'>
        <span className='sn_MessageView_time'>{this.parseUnixTime(message.createdAt)}</span>  
      </div>
      <span className='sn_MessageView_content size14xv'>{message.content}</span>
    </div>
  );

  checkCreateHeader = (prevMessage, message) => {
    if (prevMessage && message ) {
      if (prevMessage.authorId == message.authorId) {
        let diff = Math.abs(new Date(message.createdAt*1000) - new Date(prevMessage.createdAt*1000));
        let minutes = Math.floor((diff/1000)/60);

        if (minutes <= 10) {
          return false;
        }
      }
    }

    return true;
  }

  createMessageHeader = (message) => (
    <div className='sn_MessageView_Header'>
      <div className='sn_MessageView_Header_avatar'>
        <img className='avatar-3uk item-avatar' width='40px' src={user_avatar}/>
      </div>
      <span className='sn_MessageView_Header_name'>{this.props.username}</span>
    </div>
  );

  render() {
    const message = this.props.message;

    return (
      <li key={message.id} className='sn_MessageView_Wrapper'>
        {
          this.checkCreateHeader(this.props.prevMessage, message) && this.createMessageHeader(message)
        }
        {
          this.createMessageView(message)
        }
      </li>
    );
  }
}

/* */