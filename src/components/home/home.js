import React from 'react';
import { Form, Field } from 'react-final-form';
import browserHistory from  'utils/history';

import StreamConstants from 'spacenet-redux/types/streams'
import * as Utils from 'utils/utils'
import * as WebSocketActions from 'spacenet-redux/actions/websocket_actions';

import Rooms from 'components/rooms_controller';
import StreamView from 'components/stream_view';

import user_avatar from './default-user-image.png';

import './home.css';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentUser: this.props.currentUser,
      tabSelected: 'Friends',
      createRoom: false,
      displayProfile: false,
      //roomsList: this.props.roomsList,
    }

    this.createRoomRef = React.createRef();
    
  }

  reRenderParentCallback = () => {
    // this.loadStream()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id != this.props.match.params.id) {
      this.loadStream()     
    }
  }

  componentDidMount() {

    WebSocketActions.initialize()

    //this.props.actions.getRooms();
   this.loadStream()
  }

  loadStream = () => {
    const streamId = this.props.match.params.id
    if (streamId) {

      this.props.actions.getStreamMembers(streamId).then((result) => {
        if ('data' in result) {
        } else {
        }
      })

      this.props.actions.loadMessagesForStream(streamId).then((result) => {
        if ('data' in result) {
        } else {
        }
      })
    } else {
    }
  }

  handleTabChange = () => {
    //browserHistory.push('/login');
  }

  onPopupClick = (e) => {

  }

  onCreateRoom = (e) => {
    e.preventDefault();
    
    let username = this.createRoomRef.current.value;
    
    if(!username) {
      return;
    }

    username = username.trim();

    if (!this.state.currentUser.id) {
      return
    }


    const stream = {
      ownerId: this.state.currentUser.id,
      type: StreamConstants.DM,
    }

    this.props.actions.createStream(stream).then((result) => {

      if ('error' in result) {
        return;
      }

      const stream = result.data;

      this.addUserToRoom(username, stream.id);
    });
  }

  addUserToRoom = (username, streamId) => {
    const body = {
      username,
    }
    this.props.actions.addMemberToStream(body, streamId).then((result) => {

      if ('error' in result) {
        return;
      }

      const stream = result.data;
    });
  }

  handleCreateRoomChange = (e) => {
    /* this.setState({
      roomFriendQuery: e.target.value
    }) */
  }

  handleCreateRoom = (e) => {
    this.setState({createRoom: true});
  }

  disableCreateRoom = (e) => {
    if (this.state.createRoom) {
      this.setState({createRoom: false});
    }

    if (this.state.displayProfile) {
      this.setState({displayProfile: false});
    }
  }

  displayProfile = () => {
    this.setState({displayProfile: true});
  }

  logout = () => {
    this.props.actions.logout().then(({error}) => {
      if (error) {

        return;
      }

      Utils.removeSessionItem('token');
      Utils.relocate();
    });
  }

  render() {
    return (
      <div class='home' style={{height: '100%'}}>
        <div class='space_chat' onClick={this.disableCreateRoom}>
          <ul class='space_panel'>
            <div class='sn_SpacePanel_Wrapper'>
              <div class='sn_SpaceTreeLevel'>
                <li class='sn_SpaceItem'>
                  <div class='sn_SpaceButton sn_SpaceButton_home sn_SpaceButton_active sn_SpaceButton_narrow'>
                    <div class='sn_SpaceButton_selectionWrapper'>
                      <div class='sn_SpaceButton_avatarPlaceholder'>
                        <div class='sn_SpaceButton_icon'></div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class='sn_SpaceItem'>
                  <div class='sn_SpaceButton sn_SpaceButton_narrow'>
                    <div class='sn_SpaceButton_selectionWrapper'>
                      <span class='sn_BaseAvatar'>
                        <span 
                        class='sn_BaseAvatar_initial' 
                        aria-hidden="true" 
                        style={{fontSize: '20.8px', width: '32px', lineHeight: '32px'}}>M</span>
                        <img 
                        class='sn_BaseAvatar_image' 
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAARUlEQVRYhe3OMREAIAAAIVNZ0n7W0RTeOzCwM+ba52ejDggK1gFBwTogKFgHBAXrgKBgHRAUrAOCgnVAULAOCArWAcHXLrnrKnHDJPjJAAAAAElFTkSuQmCC"
                        alt="" 
                        style={{width: '32px', height: '32px'}}
                        aria-hidden="true"></img>
                      </span>
                    </div>
                  </div>
                </li>
              </div>
              <li class='sn_SpaceItem'>
                <div class='sn_SpaceButton sn_SpaceButton_narrow sn_SpaceButton_new'>
                  <div class='sn_SpaceButton_selectionWrapper'>
                    <div class="sn_SpaceButton_avatarPlaceholder">
                      <div class="sn_SpaceButton_icon"></div>
                    </div>
                  </div>
                </div>
              </li>
            </div>
          </ul>
          <div class='sn_LeftPanel'>
            <div class='sn_searchBar'>
              <input className='sn_searchBarComponent' placeholder='Find' type='text'/>
            </div>
            <div class='sn_privateStreams'>
              <div className='sn_Profile clickable-3wh' onClick={this.displayProfile}>
                <img className='avatar-3uk item-avatar' width='35px' src={user_avatar}/>
                <div class='content-3gh'>
                  <div class='nameAndDecorators'>
                    <div class='name-Ughj'>{this.state.currentUser.username}</div>
                  </div>
                </div>
                <span className='sn_UserMenuButton clickable-3wh'></span>
              </div>
              {/* <div class='sn_Profile item-friend'>
                <img className='item-avatar' width='40px' height='40px' src={user_avatar}/>
                <h3 class='size16xv' style={{fontWeight: 'bold', color: '#fff',}}>{this.state.currentUser.username}</h3>
              </div> */}
              {/* <div style={{height: '8px'}}></div> */}
              <h2 class='privateStreamsHeaderContainer container-5h8'>
                <span class='headerText'>Private Messages</span>
                <div class='privateMessageInvite iconWrapper clickable-3wh' onClick={this.handleCreateRoom} role='button' aria-label='Create DM' tabIndex='0'>
                  <svg class='privateMessageInvite icon-22A' aria-hidden="false" width="24" height="24" viewBox="0 0 18 18">
                    <polygon fill-rule="nonzero" fill="currentColor" points="15 10 10 10 10 15 8 15 8 10 3 10 3 8 8 8 8 3 10 3 10 8 15 8"></polygon>
                  </svg>
                </div>
              </h2>
            </div>
            <Rooms id={this.props.match.params.id}/>
            {/* <div className='sn_roomsList'>
              <ul>
                <Rooms rooms={this.state.roomsList}/>
                <li className='stream-2QD9 container-29Q'>
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
                </li>
              </ul>
            </div>
           */}</div>
          <StreamView id={this.props.match.params.id} reRenderParentCallback={this.reRenderParentCallback}/>
          {/* <div className='sn_SpaceView'></div> */}
        </div>
        <div className='layerContainer-yqaFcK'>
          {
            this.state.displayProfile ?
            <div className='sn_ContextualMenu_Wrapper dropdown-menu' style={{top: '55px', left: '320px', color: '#dcddde', fontSize: '14px'}}>
              <div className='header-current-user css-truncate-target'>
                <a className='no-underline user-profile-link px-3 pt-2 pb-2 mb-n2 mt-n1 d-block' 
                href={'/'+this.state.currentUser.username}
                >
                  Signed in as
                  <strong className='css-truncate-target'>{this.state.currentUser.username}</strong>
                </a>
              </div>
              <div className='dropdown-divider'></div>
              <a className='dropdown-item' href='/help'>Help</a>
              <a className='dropdown-item' href='/settings'>Settings</a>
              <div className='dropdown-divider'></div>
              <div className='dropdown-item' style={{cursor: 'pointer'}} onClick={this.logout}>Sign out</div>
              {/* <div className='popout-room popout-profile'>
                <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                <button 
                  class='input-add-friend-room addFriendItem'
                  style={{height: 'auto', padding: '8px', marginTop:'auto', marginBottom: '0'}} 
                  onClick={this.logout}
                >Sign out</button>
                </div>
              </div> */}
            </div>

            :

            <div></div>
          }
          {
            this.state.createRoom?
            <div id='popout-8' className='layer-v9HyYc' 
              style={{position: 'absolute', left: '275px', top: '186px',}}
              onClick={this.onPopupClick}
            >
              <div className='popout-room'>
                <div class='container-69h'>
                  <h3 class='header-active size18x' style={{padding: 0}}>Rooms</h3>
                  <span class='size14xv' style={{color: 'rgba(182, 186, 193, 0.82)', marginBottom: '8px'}}>Start a private conversation with someone using their username or email</span>
                </div>
                {/* <Form 
                  onSubmit={this.onCreateRoom}
                  render={({ handleSubmit, form, submitting, pristine, values }) => ( */}
                    <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={this.onCreateRoom}>
                      <input 
                        className='input-add-friend-room'
                        style={{color: '#fff'}}
                        //component='input'
                        type='text' 
                        //name='addFriendName'
                        ref={this.createRoomRef} 
                        onChange={this.handleCreateRoomChange}
                        placeholder='Username'
                      />
                      <input 
                        // disabled={submitting || pristine}
                        class='input-add-friend-room addFriendItem clickable-3wh'
                        style={{height: 'auto', padding: '8px', marginTop:'auto'}} 
                        type='submit' 
                        value='Create Room'  
                        />
                      
                    </form>
                  {/* )}
                /> */}
              </div>
            </div>
            
            :

            <div></div>
          }
        </div>
        {/* <div className='layerContainer-yqaFcK'>
        {
          this.state.displayProfile ?
            <div className='sn_ContextualMenu_Wrapper' style={{top: '55px', left: '320px'}}>
              <div className='popout-room popout-profile'></div>
            </div>

            :

            <div></div>
        }
        </div> */}
      </div>
    );
  }
}