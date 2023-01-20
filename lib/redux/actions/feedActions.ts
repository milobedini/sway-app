import { ActionTypes } from "../constants/actionTypes";

export const setArticles = (articles: []) => {
  return {
    type: ActionTypes.SET_ARTICLES,
    payload: articles,
  };
};
