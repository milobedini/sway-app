import { StackScreenProps } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";

import { LearnNavigatorParamsList } from "../../LearnNavigatorParamsList";

export type CommunityScreenProps = StackScreenProps<
  LearnNavigatorParamsList,
  "community"
>;

export const CommunityScreen = ({
  // eslint-disable-next-line
  navigation,
  // eslint-disable-next-line
  route: { params },
}: CommunityScreenProps): JSX.Element => (
  <>
    <StatusBar style="dark" />
    <Text>Community Screen</Text>
  </>
);
