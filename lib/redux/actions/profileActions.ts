import { ActionTypes } from "../constants/actionTypes";

export const setProfile = (user: {
  id: number;
  minutes: number;
  username: string;
  sessions: number;
}) => {
  return {
    type: ActionTypes.SET_PROFILE,
    payload: user,
  };
};
