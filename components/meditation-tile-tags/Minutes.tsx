import { StyleSheet, Text } from "react-native";

import { Colours } from "../../colours";
import { Fonts } from "../../fonts";
import { Tag } from "../tag";
import { MeditationTagProps } from "./MeditationTagProps";

const styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.OpenSans_700Bold,
    fontSize: 12,
    lineHeight: 18,
    color: Colours.bright.$,
  },
});

export const Minutes = ({
  meditation: { minutes },
  ...rest
}: MeditationTagProps): JSX.Element => {
  if (!minutes) return <></>;
  return (
    <Tag {...rest}>
      <Text style={styles.text}>{minutes}m</Text>
    </Tag>
  );
};
