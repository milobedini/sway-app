import { StackScreenProps } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";

import { TimerNavigatorParamsList } from "../../TimerNavigatorParamsList";

export type TimerShowScreenProps = StackScreenProps<
  TimerNavigatorParamsList,
  "show"
>;

export const TimerShowScreen = ({
  // eslint-disable-next-line
  navigation,
  // eslint-disable-next-line
  route: { params },
}: TimerShowScreenProps): JSX.Element => (
  <>
    <StatusBar style="dark" />
    <Text>Timer Show Screen</Text>
  </>
);
