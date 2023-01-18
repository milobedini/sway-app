import { StackScreenProps } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import { Colours } from "../../../../colours";
import { LearnNavigatorParamsList } from "../../LearnNavigatorParamsList";
import { NewNote, NotesList } from "./components";

export type NotesScreenProps = StackScreenProps<
  LearnNavigatorParamsList,
  "notes"
>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.dark.$,
    justifyContent: "space-between",
  },
});

export const NotesScreen = ({
  // eslint-disable-next-line
  navigation,
  // eslint-disable-next-line
  route: { params },
}: NotesScreenProps): JSX.Element => (
  <>
    <StatusBar style="light" />

    <View style={styles.container}>
      {/* Header */}
      {/* Search */}

      {/* Send notes object to be mapped as note cards. */}
      <NotesList />

      <NewNote />
    </View>
  </>
);
