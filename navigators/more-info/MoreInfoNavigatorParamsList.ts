import { ImageSourcePropType } from "react-native";

export type MoreInfoNavigatorParamsList = {
  index: undefined;
  app: undefined;
  favourites: undefined;
  about: undefined;
  show: { meditationId: number; image: ImageSourcePropType };
};
