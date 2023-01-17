import { ViewProps } from "react-native";

import { NoteTileData } from "./NoteTileData";

export type NoteTileProps = ViewProps & {
  note: NoteTileData;
  onPress?: () => void;
};
