import { StyleSheet, Text, TextProps } from "react-native";

import { Colours } from "../../colours";
import { Fonts } from "../../fonts";

const styles = StyleSheet.create({
  root: {
    color: Colours.errorDark.$,
    fontSize: 12,
    fontFamily: Fonts.OpenSans_700Bold,
  },
});

export const Error = ({ style, ...rest }: TextProps): JSX.Element => (
  <Text style={[styles.root, style]} {...rest} />
);
