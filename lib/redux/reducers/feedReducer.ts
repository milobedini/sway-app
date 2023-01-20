import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  articles: [],
};

export const feedReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_ARTICLES:
      return { ...state, articles: payload };
    default:
      return state;
  }
};
