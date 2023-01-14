import { StackScreenProps } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text } from "react-native";
import { TimerNavigatorParamsList } from "../../TimerNavigatorParamsList";

export type TimerShowScreenProps = StackScreenProps<
  TimerNavigatorParamsList,
  "show"
>;

const styles = StyleSheet.create({
  container: {},
});

export const TimerShowScreen = ({
  navigation,
  route: { params },
}: TimerShowScreenProps): JSX.Element => (
  <>
    <StatusBar style="dark" />
    <Text>Timer Show Screen</Text>
  </>
);
