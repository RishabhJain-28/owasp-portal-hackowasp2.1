import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";

import userReducer from "./userReducer";
import teamReducer from "./teamReducer";

const rootReducer = combineReducers({
  user: userReducer,
  team: teamReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["user", "team"],
};

export default persistReducer(persistConfig, rootReducer);
