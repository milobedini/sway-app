import { ActionTypes } from "../constants/actionTypes";

export const setMeditations = (meditations: []) => {
  return {
    type: ActionTypes.SET_MEDITATIONS,
    payload: meditations,
  };
};

export const setLatestMeditation = (meditation: {
  id: number;
  favourited_by: [];
  name: string;
  description: string;
  audio: string;
  category: string;
  minutes: number;
  sessions: number;
  created_at: string;
}) => {
  return {
    type: ActionTypes.SET_LATEST_MEDITATION,
    payload: meditation,
  };
};
