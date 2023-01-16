import { StyleSheet, Text, View, ViewProps } from "react-native";

import { Colours } from "../../colours";
import { Fonts } from "../../fonts";

export type TagProps = ViewProps & {
  values?: string[];
  colour?: "Green" | "Grey";
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    paddingLeft: 8,
    paddingRight: 8,
    paddingVertical: 4,
  },
  green: { backgroundColor: Colours.brightBlack.$ },
  grey: { backgroundColor: Colours.darkGrey.$ },
  text: {
    color: Colours.bright.$,
    fontFamily: Fonts.OpenSans_700Bold,
    fontSize: 12,
    lineHeight: 18,
    marginLeft: 4,
  },
});

export const Tag = ({
  style,
  values,
  colour = "Green",
  children,
  ...rest
}: TagProps): JSX.Element => (
  <View
    style={[
      styles.container,
      colour === "Green" ? styles.green : styles.grey,
      style,
    ]}
    {...rest}
  >
    {values && <Text style={styles.text}>{values.join(" | ")}</Text>}
    {children}
  </View>
);
