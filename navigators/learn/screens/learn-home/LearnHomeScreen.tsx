import { StackScreenProps } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";

import { LearnNavigatorParamsList } from "../../LearnNavigatorParamsList";

export type LearnHomeScreenProps = StackScreenProps<
  LearnNavigatorParamsList,
  "home"
>;

export const LearnHomeScreen = ({
  // eslint-disable-next-line
  navigation,
  // eslint-disable-next-line
  route: { params },
}: LearnHomeScreenProps): JSX.Element => (
  <>
    <StatusBar style="dark" />
    <Text>Learn Home Screen</Text>
  </>
);
