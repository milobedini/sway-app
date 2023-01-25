import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

import { Colours } from "../../../../../colours";
import { textStyles } from "../../../../../components/text";
import { NoteTileProps } from "./NoteTileProps";
import { baseUrl, secureDelete } from "../../../../../lib/api/api";
import { useToast } from "../../../../../components/toast/useToast";
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
  setNoteDeleted,
  ...rest
}: NoteTileProps): JSX.Element => {
  const deleteNote = async () => {
    const config = await secureDelete(`${baseUrl}/notes/${note.id}/`);
    try {
      await axios(config);
      setNoteDeleted(true);
      setNoteDeleted(false);
      useToast(Platform.OS, "remove");
    } catch (err) {
      return err;
    }
  };

  return (
    <Pressable style={[styles.container, style]} {...rest}>
      <Text style={[textStyles.body, styles.text]}>{note.text}</Text>
      <View style={styles.footer}>
        <Text style={[textStyles.body, styles.date]}>
          {note.date && new Date(note.date).toLocaleDateString("en-GB")}
        </Text>

        <MaterialIcons
          name="delete-forever"
          size={24}
          color={Colours.errorDark.$}
          onPress={deleteNote}
        />
      </View>
    </Pressable>
  );
};
