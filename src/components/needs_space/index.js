import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import { getCurrentUser } from 'spacenet-redux/selectors/entities/common';
import { getFriends } from 'spacenet-redux/selectors/entities/users';
import { getSpaces } from 'spacenet-redux/selectors/entities/spaces';

import { getSpace } from 'spacenet-redux/actions/spaces';
import { getStreamsAndMembers } from 'spacenet-redux/actions/streams';

import NeedsSpace from './needs_space';

const mapStateToProps = (state, ownProps) => {
  const currentUser = getCurrentUser(state);

  return {
    currentUser,
    //spaceList: getSpaces(state),
  };
}

const mapDispatchToProps = (dispatch) => (
  {
    actions: bindActionCreators({
      getStreamsAndMembers,
      getSpace,
    }, dispatch),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(NeedsSpace);