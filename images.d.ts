declare module "*.jpg" {
  import { ImageSourcePropType } from "react-native";

  const content: ImageSourcePropType;

  export default content;
}
declare module "*.png" {
  import { ImageSourcePropType } from "react-native";

  const content: ImageSourcePropType;

  export default content;
}
declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";

  const content: React.FC<SvgProps>;

  export default content;
}

declare module "*.mp3";

declare module "*.mp4" {
  import { VideoProps } from "expo-av";
  const content: VideoProps;
  export default content;
}
