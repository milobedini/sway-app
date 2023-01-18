import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

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
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-between",
  },
  active: {
    height: "50%",
    marginBottom: 36,
    marginTop: 8,
  },
  footer: { flexDirection: "row", justifyContent: "space-between" },
  input: {},
});

export const NewNote = (): JSX.Element => {
  const [noteText, setNoteText] = useState("");
  const [active, setActive] = useState(false);
  const charLimit = 600;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, active && styles.active]}
    >
      <View style={[styles.inner]}>
        <TextInput
          style={styles.input}
          onChangeText={setNoteText}
          value={noteText}
          placeholder="Type to add a note..."
          autoCorrect
          onFocus={() => setActive(true)}
        />
        <View style={styles.footer}>
          <Text>{charLimit - noteText.length} Remaining</Text>
          <Text>Save icon</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
