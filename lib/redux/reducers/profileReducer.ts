import { ActionTypes } from "../constants/actionTypes";

export const profileReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PROFILE:
      return { ...state, profile: payload };

    default:
      return state;
  }
};
