import { combineReducers } from "redux";
import userReducer from "./userReducer";
import teamReducer from "./teamReducer";

export default combineReducers({
  user: userReducer,
  team: teamReducer,
});
