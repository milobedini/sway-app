import { ViewProps } from "react-native";

import { NoteTileData } from "./NoteTileData";

export type NoteTileProps = ViewProps & {
  note: NoteTileData;
  setNoteDeleted: (x: boolean) => void;
  onPress?: () => void;
};
