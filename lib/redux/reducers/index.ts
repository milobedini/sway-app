import { combineReducers } from "redux";

import { feedReducer } from "./feedReducer";
import { meditationsReducer } from "./meditationsReducer";
import { profileReducer } from "./profileReducer";

const reducers = combineReducers({
  allMeditations: meditationsReducer,
  userProfile: profileReducer,
  allArticles: feedReducer,
  latestMeditation: meditationsReducer,
});
export default reducers;
