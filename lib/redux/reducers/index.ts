import { combineReducers } from "redux";

import { meditationsReducer } from "./meditationsReducer";
import { profileReducer } from "./profileReducer";

const reducers = combineReducers({
  allMeditations: meditationsReducer,
  userProfile: profileReducer,
});
export default reducers;
