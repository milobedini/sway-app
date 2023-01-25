import { View } from "react-native";
import LottieView from "lottie-react-native";

import { Colours } from "../../colours";
export const LoadingIndicator = ({
  marginBottom,
}: {
  marginBottom: number;
}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colours.dark.$,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: marginBottom,
        width: "100%",
        margin: 0,
        padding: 0,
      }}
    >
      <LottieView
        style={{ alignSelf: "center", width: 260, height: 260 }}
        source={require("../../assets/Sway-Loading.json")}
        autoPlay
        loop
        speed={0.85}
      />
    </View>
  );
};
