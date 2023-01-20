import { ViewProps } from "react-native";

import { PostTileData } from "./PostTileData";

export type PostTileProps = ViewProps & {
  post: PostTileData;
  article: boolean;
  onPress?: () => void;
};
