import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colours } from "../../../../../colours";
import { textStyles } from "../../../../../components/text";
import { NoteTileProps } from "./NoteTileProps";

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 6,
    justifyContent: "space-between",
  },
  text: {
    color: Colours.black.$,
  },
  date: { color: Colours.black.$, fontSize: 14 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
  },
});

export const SmallNoteTile = ({
  note,
  style,
  ...rest
}: NoteTileProps): JSX.Element => {
  return (
    <Pressable style={[styles.container, style]} {...rest}>
      <Text style={[textStyles.body, styles.text]}>{note.text}</Text>
      <View style={styles.footer}>
        <Text style={[textStyles.body, styles.date]}>
          {note.date && new Date(note.date).toLocaleDateString()}
        </Text>

        <Text
        // onPress={() => console.log(note.id)}
        >
          Delete Icon
        </Text>
      </View>
    </Pressable>
  );
};
