import { ActionTypes } from "../constants/actionTypes";
const initialState = {
  meditations: [],
};

export const meditationsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_MEDITATIONS:
      return { ...state, meditations: payload };
    case ActionTypes.SET_LATEST_MEDITATION:
      return { ...state, latestMeditation: payload };
    default:
      return state;
  }
};
