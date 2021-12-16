import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import {createUser} from 'spacenet-redux/actions/users'
import { login } from 'spacenet-redux/actions/users';
import Register from './register';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({createUser, login}, dispatch)
});

/* const mapDispatchToProps = dispatch => ({
  onSubmitForm: (email, password) =>
    dispatch({type: "ON_LOGIN", email, password }),
}); */

export default connect(()=>{}, mapDispatchToProps)(Register);