import { StyleSheet } from "react-native";

import { Colours } from "../../colours";
import { Fonts } from "../../fonts";

export const textStyles = StyleSheet.create({
  body: {
    fontFamily: Fonts.OpenSans_500Medium,
    color: Colours.white.$,
    fontSize: 16,
    marginVertical: 6,
    lineHeight: 24,
  },
  title: {
    fontFamily: Fonts.OpenSans_500Medium,
    fontSize: 32,
    color: Colours.lightGrey.$,
    lineHeight: 36,
    marginVertical: 6,
  },
  hint: {
    fontFamily: Fonts.OpenSans_500Medium,
    fontSize: 12,
    color: Colours.bright.$,
    marginVertical: 4,
    lineHeight: 24,
  },
});

export const designStyles = StyleSheet.create({
  title: {
    fontFamily: Fonts.OpenSans_700Bold,
    fontSize: 36,
    lineHeight: 1.2 * 36,
    textAlign: "center",
    color: "white",
    marginBottom: 36,
  },
  subtitle: {
    fontFamily: Fonts.OpenSans_500Medium,
    fontSize: 24,
    lineHeight: 1.2 * 24,
    color: "white",
    marginBottom: 24,
  },
  body: {
    fontFamily: Fonts.OpenSans_400Regular,
    fontSize: 16,
    lineHeight: 1.6 * 16,
    color: "white",
    marginBottom: 16,
  },
});
