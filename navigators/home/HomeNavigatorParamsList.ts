import { ImageSourcePropType } from "react-native";

export type HomeNavigatorParamsList = {
  homepage: undefined;
  show: { meditationId: number; image: ImageSourcePropType };
};
