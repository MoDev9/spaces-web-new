import { combineReducers } from "redux";
import users from './users';
import spaces from "./spaces";
import messages from "./messages";
import streams from './streams';
import typing from "./typing";

export default combineReducers({
  users,
  spaces,
  messages,
  streams,
  typing,
});