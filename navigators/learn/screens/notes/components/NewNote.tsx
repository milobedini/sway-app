import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";

import { Colours } from "../../../../../colours";
import { textStyles } from "../../../../../components/text";
import { baseUrl, secureWithBody } from "../../../../../lib/api/api";
import { useToast } from "../../../../../components/toast/useToast";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colours.bright.$,
    justifyContent: "space-between",
    borderRadius: 10,
    paddingVertical: 6,
    marginBottom: 8,
    height: "30%",
    marginHorizontal: 14,
  },
  inner: {
    padding: 24,
    paddingTop: 3,
    flex: 1,
    justifyContent: "space-between",
  },
  active: {
    height: "50%",
    marginBottom: 36,
    marginTop: 8,
  },
  footer: { flexDirection: "row", justifyContent: "space-between" },
  input: {
    color: "black",
  },
});

type NewNoteProps = {
  setNoteAdded: (x: boolean) => void;
  active: boolean;
  setActive: (x: boolean) => void;
};
export const NewNote = ({
  setNoteAdded,
  active,
  setActive,
}: NewNoteProps): JSX.Element => {
  const [noteText, setNoteText] = useState("");

  const charLimit = 600;

  const handleSubmit = async () => {
    if (noteText.trim().length <= 0) return;

    const data = { text: noteText };
    const config = await secureWithBody(`${baseUrl}/notes/`, data, "post");
    try {
      await axios(config);
      setNoteAdded(true);
      setNoteText("");
      setNoteAdded(false);
      setActive(false);
      Keyboard.dismiss();
      useToast(Platform.OS, "add");
    } catch (err) {
      return err;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, active && styles.active]}
    >
      <View style={[styles.inner]}>
        <TextInput
          style={[textStyles.body, styles.input]}
          onChangeText={setNoteText}
          value={noteText}
          placeholder="Type to add a note..."
          autoCorrect
          onPressIn={() => setActive(true)}
          onFocus={() => setActive(true)}
          multiline
          numberOfLines={8}
          returnKeyType="none"
        />
        <View style={styles.footer}>
          <Text>{charLimit - noteText.length} Remaining</Text>
          <FontAwesome5
            name="save"
            size={24}
            color={Colours.yellowNote.$}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
