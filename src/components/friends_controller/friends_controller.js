import React from 'react';

import user_avatar from './default-user-image.png';

export default class Friends extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      tabSelected: 'All', 
      tabStates: ['Online','All','Pending', 'Add Friend'],
      friendsList: this.props.friendsList,
    };

    this.usernameRef = React.createRef();
  }

  componentDidMount() {
    
  }

  sendFriendRequest = (e) => {
    e.preventDefault();
    const username = this.usernameRef.current.value.trim();
    
    if (username) {
      const user = {
        username,
      };


      this.props.actions.addFriend(user).then((result) => {
        if ('error' in result) {
          
          return;
        }

        const ruser = result.data;
      });
    }
    else {
    }
  }

  handleTabChange = () => {
    if (this.state.tabSelected != 'Add Friend') {
      const listItems = this.createFriendsList();

      return (
        <div>
          <div style={{paddingTop: '8px'}}>
            <div>
              <h2 class='title-30 container-30'>{this.state.tabSelected} - {listItems.length}</h2>
            </div>
          </div>
          <ul
            class='title-30'>
            {listItems}
          </ul>
        </div>
      );
    }

    return (
      <div className='container-add-friend'>
        <span className='header-active size20x'>Add Friend</span>
        <span className='size14xv'>You can add a friend using their username.</span>
        <div className='input-add-friend'>
          <input 
            className='input-username-xyz'
            type='text' 
            ref={this.usernameRef} 
            placeholder='Username'
          />
          <button 
            class='btn-add-friend clickable-3wh' 
            type='submit' 
            onClick={this.sendFriendRequest}
          >Send Friend Request</button>
        </div>
      </div>
    );
  }

  createFriendsList = () => {
  
    if (!this.state.friendsList) {
      return (<li></li>);
    }

    const listItems = Object.values(this.state.friendsList).map((friend) => {
      if (this.state.tabSelected == 'All' || friend.status == this.state.tabSelected) {
        return (
          <li key={friend.id} class='item-friend'>
            <img className='item-avatar' width='35px' src={user_avatar}/>
            <div className='item-friend-display'>
              <h3 class='size16xv' style={{fontWeight: 'bold', color: '#fff',}}>{friend.username}</h3>
              <span className='item-friend-display-status'>{friend.status}</span>
            </div>
            {/* <span class='size14xv'>{friend.status}</span> */}
          </li>
        );
      }
    });

    return listItems;
  }

  /* componentDidMount() {
    this.props.getMyFriends().then(({error}) => {
      if (error) {
        
      }
    })
  } */

  render() {
    const content = this.handleTabChange();

    /* let friends = this.props.friends || [];
    if (this.state.tabSelected != 'all') {
      friends = [];
    } */

    return (
        <main class='sn_SpaceView'>
          <div class='sn_SpaceHeader'>
            <div class='children-48QH'>
              <div class='iconWrapper clickable-3wh' role='button' aria-hidden='true'>
                <svg class='linkButtonIcon' 
                  aria-hidden='false'
                  viewBox='0 0 24 24'
                  width='16'
                  height='16'>
                  <g fill="none" fill-rule="evenodd">
                    <path fill="currentColor" fill-rule="nonzero" 
                    d="M0.5,0 L0.5,1.5 C0.5,5.65 2.71,9.28 6,11.3 L6,16 L21,16 L21,14 C21,11.34 15.67,10 13,10 C13,10 12.83,10 12.75,10 C8,10 4,6 4,1.5 L4,0 L0.5,0 Z M13,0 C10.790861,0 9,1.790861 9,4 C9,6.209139 10.790861,8 13,8 C15.209139,8 17,6.209139 17,4 C17,1.790861 15.209139,0 13,0 Z" transform="translate(2 4)"></path>
                    <path d="M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z"></path>
                  </g>
                </svg>
              </div>
              <h3 class='title-28wC3r base1x size16xv'>Friends</h3>
              <div class='divider-3'></div>
              <div class='tabBar'>
                {this.state.tabStates.map((tabState) => {
                  let classNames = 'name-Ughj tabBarItem';

                  if (this.state.tabSelected == tabState)
                    classNames += ' tabBarItem-selected';
                  
                  if (tabState == 'Add Friend')
                    classNames += ' addFriendItem';
                  return (<div class={classNames} onClick={() => this.setState({tabSelected: tabState})}>{tabState}</div>);
                })}
                {/* <div class='name-Ughj tabBarItem tabBarItem-selected'>Online</div>
                <div class='name-Ughj tabBarItem'>All</div>
                <div class='name-Ughj tabBarItem'>Pending</div> */}
                {/* <div 
                  class='name-Ughj tabBarItem addFriendItem'
                  onClick={this.addFriend}>Add Friend</div> */}
              </div>
            </div>
          </div>
          <div class='sn_MainSplit'>
            <div class='sn_MainSplitBody'>
              
              {content}
              {/* <div class='emptyContainer'>
                <div class='friendsEmpty'>
                  <div class='flex-qW34s' style={{flex: '1 1 auto'}}>
                    <div class='size16xv' style={{color: '#72767d', textAlign: 'center'}}>There are no friends online.</div>
                  </div>
                </div>
              </div> */}
            </div>
            <div class='sn_ActiveColumn'>
              <div class='container-flR5'>
                <h3 class='header-active size20x'>Active Friends</h3>
              </div>
            </div>
          </div>
        </main>
    );
  }
}