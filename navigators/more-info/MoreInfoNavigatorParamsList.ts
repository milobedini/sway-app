import { ImageSourcePropType } from "react-native";

export type MoreInfoNavigatorParamsList = {
  index: undefined;
  app: undefined;
  favourites: undefined;
  about: undefined;
  contact: undefined;
  show: { meditationId: number; image: ImageSourcePropType };
};
