import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { getCurrentUser } from "spacenet-redux/selectors/entities/common";
import { getCurrentProfile } from "spacenet-redux/actions/users";

import ProtectedRoute from "./protected";

const mapStateToProps = (state, ownProps) => {
  const currentUser = getCurrentUser(state);

  return {
    currentUser,
  };
}

const mapDispatchToProps = (dispatch) => (
  {
    actions: bindActionCreators({
      getCurrentProfile,
    }, dispatch),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);