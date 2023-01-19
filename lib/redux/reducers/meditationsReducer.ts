import { ActionTypes } from "../constants/actionTypes";
const initialState = {
  meditations: [],
};

export const meditationsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_MEDITATIONS:
      return { ...state, meditations: payload };
    default:
      return state;
  }
};
