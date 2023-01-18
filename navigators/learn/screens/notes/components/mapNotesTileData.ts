import { ThenThrow } from "../../../../../lib/then-throw";
import { NoteTileData } from "./NoteTileData";

export declare type NotesListResponseDataItem = {
  id: number;
  date?: string;
  text?: string;
};

export const mapNotesTileData = (
  note: NotesListResponseDataItem
): NoteTileData => {
  const id = note.id ?? ThenThrow("id is missing");
  const date = note?.date;
  const text = note?.text;

  return {
    id,
    date,
    text,
  };
};
