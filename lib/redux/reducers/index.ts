import { combineReducers } from "redux";

import { meditationsReducer } from "./meditationsReducer";

const reducers = combineReducers({
  allMeditations: meditationsReducer,
});
export default reducers;
