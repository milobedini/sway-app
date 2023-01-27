import { StyleSheet, Text } from "react-native";

import { Fonts } from "../../fonts";
import { Tag } from "../tag";
import { MeditationTagProps } from "./MeditationTagProps";

export const Category = ({
  meditation: { category },
  colour,
  ...rest
}: MeditationTagProps): JSX.Element => {
  const styles = StyleSheet.create({
    text: {
      fontFamily: Fonts.OpenSans_700Bold,
      fontSize: 12,
      lineHeight: 18,
      color: colour,
    },
  });
  if (!category) return <></>;
  return (
    <Tag {...rest}>
      <Text style={[styles.text]}>{category}</Text>
    </Tag>
  );
};
