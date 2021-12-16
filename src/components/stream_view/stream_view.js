import React from 'react';

import './stream_view.css';
import tag from './tag_white_24dp.svg'

import MessageView from 'components/message_view';
import CreatePost from 'components/create_post';

const getUsername = (users, userId) => {
  // return users[userId].username;
  for (const key in users) {
    if (Object.hasOwnProperty.call(users, key)) {
      const user = users[key];
      if (user.id == userId) {
        if (user.username) {
          return user.username;
        }
      }
    }
  }
  /* users.forEach(user => {
    if (user.id == userId) {
      return user.username
    }
  }); */

  return "noname"
} 

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

/* const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", 
  "Friday", "Saturday"
]; */

const getDateString = (time) => {
  const date = new Date(time * 1000)
  const now = new Date()
  //Check if message is from yesterday
  if (now.getFullYear() == date.getFullYear() && now.getMonth() == date.getMonth()) {
    if (date.getDate() == now.getDate()-1)
      return `Yesterday`      
    else if (date.getDate() == now.getDate())
      return "Today"
  }

  const month = monthNames[date.getMonth()]
  //const day = dayNames[date.getDay()]
  const dayOfMonth = date.getDate()
  const year = date.getFullYear()

  return `${month} ${dayOfMonth}, ${year}`;
}

export default class StreamView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      streamId: this.props.id,
      messagesList: this.props.messagesList,
      streamMembers: this.props.streamMembers,
      userTyping: this.props.userTyping,
    }
  }

  createMessageView = () => {
    let prevMessage;
    let currentDate;
    //getUsername(this.state.streamMembers, message.authorId)
    const uname = "momo"
    const messagesList = Object.values(this.props.messagesList).map((message) => {
      let dateStr = getDateString(message.createdAt)
      let dateView;
      let messageView;
      if (dateStr != currentDate) {
        dateView = (
          <div className='date-message-view'>
            <span class="sn_MessageView_content size14xv">{dateStr}</span>
          </div>
        );
      }
      messageView = (
      <div>
        {dateView}
        <li key={message.id}>
          <MessageView 
          username={uname} 
          message={message} 
          prevMessage={prevMessage}
          />
        </li>
      </div>
      );
      prevMessage = message
      currentDate = dateStr
      return messageView;
    });

    return messagesList;
  }

  render() {
    if (this.state.userTyping) {
    }

    let msgList = this.props.messagesList

    if (this.state.messagesList && !Object.keys(this.state.messagesList).length ) {
      msgList = this.state.messagesList;
    }

    return (
      <div className='sn_SpaceView'>
        <div class='sn_SpaceHeader'>
          <div class='children-48QH'>
            {/* <div class='iconWrapper clickable-3wh' role='button' aria-hidden='true'> */}
            <img className="avatar-3uk item-avatar" src={tag} width='35px'/>
            {/* </div> */}
            {/* title-28wC3r base1x  */}
            <h3 class='size18x' style={{fontWeight: '600', letterSpacing: '1.5px'}}>Private Conversation</h3>
            <div class='divider-3'></div>
          </div>
        </div>  
        <div className='streamView_root'>
          <div className='streamView_msg'>
            <ul className="sn_StreamView_MessageList">
              {msgList && this.createMessageView()}
            </ul>
              {/* <MessageView /> */}
          </div>
          <CreatePost id={this.props.id}/>
        </div>
      </div>
    );
  }
}