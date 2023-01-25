// import { MotiView } from "@motify/components";
import { View } from "react-native";
import LottieView from "lottie-react-native";

import { Colours } from "../../colours";

// const size = 100;
export const LoadingIndicator = ({
  // size,
  marginBottom,
}: {
  // size: number;
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
      {/* <MotiView
        // Breathing animation
        from={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: size / 40,
          shadowOpacity: 0.5,
          borderColor: Colours.white.$,
          shadowColor: Colours.white.$,
        }}
        animate={{
          width: size * 2,
          height: size * 2,
          borderRadius: size,
          borderWidth: size / 5,
          shadowOpacity: 1,
          borderColor: Colours.bright.$,
          shadowColor: Colours.bright.$,
        }}
        transition={{ type: "timing", duration: 1000, repeat: Infinity }}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: size / 10,

          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: 10,
        }}
      /> */}
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
