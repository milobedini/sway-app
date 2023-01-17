import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { Colours } from "../../../../../colours";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colours.bright.$,
    justifyContent: "space-between",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 8,
    height: "30%",
    marginHorizontal: 14,
  },
  content: {},
  footer: { flexDirection: "row", justifyContent: "space-between" },
  input: {
    marginTop: 8,
  },
});

export const NewNote = (): JSX.Element => {
  const [noteText, setNoteText] = useState("");
  const charLimit = 600;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setNoteText}
        value={noteText}
        placeholder="Type to add a note..."
        autoCorrect
      />
      <View style={styles.footer}>
        <Text>{charLimit - noteText.length} Remaining</Text>
        <Text>Save icon</Text>
      </View>
    </View>
  );
};
