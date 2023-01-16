import { ViewProps } from "react-native";

import { MeditationTileData } from "./MeditationTileData";

export type MeditationTileProps = ViewProps & {
  meditation: MeditationTileData;
  onPress?: () => void;
};
