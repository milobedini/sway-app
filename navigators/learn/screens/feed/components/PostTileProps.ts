import { Dispatch, SetStateAction } from "react";
import { ViewProps } from "react-native";

import { PostTileData } from "./PostTileData";

export type PostTileProps = ViewProps & {
  post: PostTileData;
  article: boolean;
  onPress: (id: number) => void;
  deleted: boolean;
  setDeleted: Dispatch<SetStateAction<boolean>>;
};
