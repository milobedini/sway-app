import { StackScreenProps } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text } from "react-native";
import { LearnNavigatorParamsList } from "../../LearnNavigatorParamsList";

export type LearnHomeScreenProps = StackScreenProps<
  LearnNavigatorParamsList,
  "home"
>;

const styles = StyleSheet.create({
  container: {},
});

export const LearnHomeScreen = ({
  navigation,
  route: { params },
}: LearnHomeScreenProps): JSX.Element => (
  <>
    <StatusBar style="dark" />
    <Text>Learn Home Screen</Text>
  </>
);
