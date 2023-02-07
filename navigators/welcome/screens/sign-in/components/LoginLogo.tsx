import { Image, View } from "react-native";

import imageSource from "../../../../../assets/logo_black.png";
import { loginConstants } from "./loginConstants";
import { Colours } from "../../../../../colours";

export const LoginLogo = (): JSX.Element => (
  <View
    style={{
      backgroundColor: Colours.dark.$,
      borderRadius: 80,
      width: 100,
      height: 100,
      borderWidth: 1,
      borderColor: Colours.white.$,

      marginBottom: loginConstants.spacing * 3,
    }}
  >
    <Image
      source={imageSource}
      style={{
        width: 100,
        height: 100,
        resizeMode: "cover",
      }}
    />
  </View>
);
