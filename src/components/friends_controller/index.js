import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

//import { getMyFriends } from 'spacenet-redux/actions/users';
import { addFriend } from 'spacenet-redux/actions/users';
import { getMyFriends } from 'spacenet-redux/actions/users';

import { getFriends } from 'spacenet-redux/selectors/entities/users';
import { getCurrentUser } from 'spacenet-redux/selectors/entities/common';

import Friends from './friends_controller';

const mapStatetoProps = (state) => {
  const currentUser = getCurrentUser(state);

  return {
    currentUser,
    friendsList: getFriends(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    addFriend,
    getMyFriends,
  }, dispatch),
});

export default connect(mapStatetoProps, mapDispatchToProps)(Friends);