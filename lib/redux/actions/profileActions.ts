import { ActionTypes } from "../constants/actionTypes";

export const setProfile = (user) => {
  return {
    type: ActionTypes.SET_PROFILE,
    payload: user,
  };
};
