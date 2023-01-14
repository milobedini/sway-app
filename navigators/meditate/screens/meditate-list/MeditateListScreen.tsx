import { StackScreenProps } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text } from "react-native";
import { Colours } from "../../../../colours";
import { MeditateList } from "../../../../components/meditate-list";
import { MeditateNavigatorParamsList } from "../../MeditateNavigatorParamsList";

export type MeditateListScreenProps = StackScreenProps<
  MeditateNavigatorParamsList,
  "list"
>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.dark.$,
  },
});

export const MeditateListScreen = ({
  navigation,
  route: { params },
}: MeditateListScreenProps): JSX.Element => (
  <>
    <StatusBar style="dark" />
    <Text>Meditate List Screen</Text>
    <MeditateList onPress={() => console.log("Pressed a Meditation")} />
  </>
);
