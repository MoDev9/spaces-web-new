import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';

import {login} from 'spacenet-redux/actions/users'
import { getDefaultStream } from 'spacenet-redux/actions/users';

import Login from './login';

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    login,
    getDefaultStream,
  }, dispatch)
});

/* const mapDispatchToProps = dispatch => ({
  onSubmitForm: (email, password) =>
    dispatch({type: "ON_LOGIN", email, password }),
}); */

export default connect(()=>{}, mapDispatchToProps)(Login);