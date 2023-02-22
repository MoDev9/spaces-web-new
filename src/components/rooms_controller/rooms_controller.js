import React from 'react'
//import browserHistory from  'utils/history';

import user_avatar from './default-user-image.png';
import './rooms.css'

export default class Rooms extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: this.props.currentUser,
      id: this.props.id,
      friendsList: this.props.friendsList,
      roomsList: this.props.roomsList,
    }

  }

  componentDidMount() {
    
  }

  componentDidUpdate(prevProps, prevState) {
  }

  handleCreateRoom = (e) => {
    this.setState({createRoom: true});
  }

  getRoomName = (members) => {
    let roomName = "";

    members.forEach(member => {
      roomName = roomName + ", ";
    });

    roomName = roomName.replace(/,\s*$/, "");
  }

  /* handleRoomClick = (id) => {
    if (!id) {
      return
    }
    browserHistory.push(`/streams/@me/${id}`)
  } */

  createRoomsList = (roomsList) => {
    const streamId = this.props.id
    if (!roomsList || roomsList.length == 0) {
      //return <li>Empty Room</li>
      return <li></li>
    }
    else {
      return Object.values(roomsList).map((stream) => {
          let divClass = "layout-2Zf9"

          if (stream.id == streamId) {
            divClass += " layout-2Zf9-selected"
          }
          
          return (
            <li key={stream.id} 
            // style={{cursor: "pointer"}} 
            className='stream-2QD9 container-29Q'>
            <a href={"/streams/@me/" + stream.id} className={divClass}>
              {/* <div className={divClass}> */}
                <img className='avatar-3uk item-avatar' width='35px' src={user_avatar}/>
                <div class='content-3gh'>
                  <div class='nameAndDecorators'>
                    <div class='name-Ughj'>{
                      //stream.members ? this.getRoomName(stream.members) : <div></div>
                      stream.name ? <div>{stream.name}</div> : <div>name 2</div>
                    }</div>
                  </div>
                </div>
              {/* </div> */}
            </a>
            </li>
          );
        }
      );
    }
  }

  render() {
    const roomsList = this.state.roomsList;
    return (
      <div className='sn_roomsList'>
          {/* <h2 class='privateStreamsHeaderContainer container-5h8'>
            <span class='headerText'>Private Messages</span>
            <div class='privateMessageInvite iconWrapper clickable-3wh' onClick={this.handleCreateRoom} role='button' aria-label='Create DM' tabIndex='0'>
              <svg class='privateMessageInvite icon-22A' aria-hidden="false" width="24" height="24" viewBox="0 0 18 18">
                <polygon fill-rule="nonzero" fill="currentColor" points="15 10 10 10 10 15 8 15 8 10 3 10 3 8 8 8 8 3 10 3 10 8 15 8"></polygon>
              </svg>
            </div>
          </h2> */}
          <ul>
            {this.createRoomsList(roomsList)}
            {/* <li className='stream-2QD9 container-29Q'>
              <div className='layout-2Zf9'>
                <img className='avatar-3uk item-avatar' width='35px' src={user_avatar}/>
                <div class='content-3gh'>
                  <div class='nameAndDecorators'>
                    <div class='name-Ughj'></div>
                  </div>
                </div>
              </div>
            </li>
            <li className='stream-2QD9 container-29Q'>
              <div className='layout-2Zf9'>
                <img className='avatar-3uk item-avatar' width='35px' src={user_avatar}/>
                <div class='content-3gh'>
                  <div class='nameAndDecorators'>
                    <div class='name-Ughj'>John_20</div>
                  </div>
                </div>
              </div>
            </li> */}
          </ul>
        </div>
    );
  }
}