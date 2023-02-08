import { ThenThrow } from "../../lib/then-throw";
import { MeditationTileData } from "../meditation-tile";

export declare type MeditationListResponseDataItem = {
  id?: number;
  name?: string;
  description?: string;
  audio?: string;
  category?: string;
  minutes?: number;
  sessions?: number;
  created_at?: string;
  favourited_by?: [];
};

export const mapMeditationTileData = (
  meditation: MeditationListResponseDataItem
): MeditationTileData => {
  const meditationId = meditation.id ?? ThenThrow("id is missing");
  const name = meditation?.name;
  const description = meditation?.description;
  const audio = meditation?.audio;
  const category = meditation?.category;
  const minutes = meditation?.minutes;
  const sessions = meditation?.sessions;
  const createdAt = meditation?.created_at;
  return {
    meditationId,
    name,
    description,
    audio,
    category,
    minutes,
    sessions,
    createdAt,
  };
};
