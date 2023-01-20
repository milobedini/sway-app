import { ActionTypes } from "../constants/actionTypes";

export const setMeditations = (meditations: []) => {
  return {
    type: ActionTypes.SET_MEDITATIONS,
    payload: meditations,
  };
};
