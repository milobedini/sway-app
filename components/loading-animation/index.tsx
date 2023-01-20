import { MotiView } from "@motify/components";
import { View } from "react-native";

import { Colours } from "../../colours";

export const LoadingIndicator = ({
  size,
  marginBottom,
}: {
  size: number;
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
      }}
    >
      <MotiView
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
          width: size + 20,
          height: size + 20,
          borderRadius: (size + 20) / 2,
          borderWidth: size / 10,
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
      />
    </View>
  );
};
