import { View } from "react-native";
import Svg, { Path, SvgProps } from "react-native-svg";
import { BaseToast, ToastProps } from "react-native-toast-message";
import { FontAwesome } from "@expo/vector-icons";

import { Colours } from "../../colours";
import { Fonts } from "../../fonts";

const ToastCheckIcon = (props: SvgProps) => (
  <Svg {...props} width={21} height={20} fill={props.fill}>
    <Path
      d="M20.484.992a.833.833 0 0 0-.573.252L7.167 13.988 1.923 8.744A.833.833 0 1 0 .744 9.923l5.833 5.833a.833.833 0 0 0 1.179 0L21.089 2.423a.833.833 0 0 0-.605-1.431Z"
      stroke={props.stroke}
      strokeWidth={2.375}
    />
  </Svg>
);

export const toastConfig = {
  add: (props: ToastProps) => (
    <View
      pointerEvents="none"
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BaseToast
        {...props}
        style={{
          backgroundColor: Colours.bright.$,
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: 8,
          height: 60,
          width: "80%",
          shadowColor: "rgba(52, 113, 93, 0.3)",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 1,
          shadowRadius: 36,
          borderRadius: 15,
          marginTop: 16,
          borderWidth: 1,
          borderLeftWidth: 1,
          borderLeftColor: Colours.darkButton.$,
          borderColor: Colours.darkButton.$,
        }}
        contentContainerStyle={{
          height: "100%",
          width: "80%",
          flex: 0.8,
        }}
        text1Style={{
          fontFamily: Fonts.OpenSans_500Medium,
          textAlign: "center",
          fontWeight: "700",
          fontSize: 14,
          color: Colours.dark.$,
        }}
        renderLeadingIcon={() => <ToastCheckIcon stroke={Colours.dark.$} />}
      />
    </View>
  ),
  remove: (props: ToastProps) => (
    <View
      pointerEvents="none"
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BaseToast
        {...props}
        style={{
          backgroundColor: Colours.bright.$,
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: 8,
          height: 60,
          width: "80%",
          shadowColor: "rgba(52, 113, 93, 0.3)",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 1,
          shadowRadius: 36,
          borderRadius: 15,
          marginTop: 16,
          borderWidth: 1,
          borderLeftWidth: 1,
          borderLeftColor: Colours.darkButton.$,
          borderColor: Colours.darkButton.$,
        }}
        contentContainerStyle={{
          height: "100%",
          width: "80%",
          flex: 0.8,
        }}
        text1Style={{
          fontFamily: Fonts.OpenSans_500Medium,
          textAlign: "center",
          fontSize: 14,
          color: Colours.darkButton.$,
        }}
        renderLeadingIcon={() => (
          <FontAwesome name="remove" size={24} color={Colours.errorDark.$} />
        )}
      />
    </View>
  ),
};
