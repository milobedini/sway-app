import { StackScreenProps } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";

import { LearnNavigatorParamsList } from "../../LearnNavigatorParamsList";

export type NotesScreenProps = StackScreenProps<
  LearnNavigatorParamsList,
  "notes"
>;

export const NotesScreen = ({
  // eslint-disable-next-line
  navigation,
  // eslint-disable-next-line
  route: { params },
}: NotesScreenProps): JSX.Element => (
  <>
    <StatusBar style="dark" />
    <Text>Notes Screen</Text>
  </>
);
