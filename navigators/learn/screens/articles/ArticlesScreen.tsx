import { StackScreenProps } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";

import { LearnNavigatorParamsList } from "../../LearnNavigatorParamsList";

export type ArticlesScreenProps = StackScreenProps<
  LearnNavigatorParamsList,
  "articles"
>;

export const ArticlesScreen = ({
  // eslint-disable-next-line
  navigation,
  // eslint-disable-next-line
  route: { params },
}: ArticlesScreenProps): JSX.Element => (
  <>
    <StatusBar style="dark" />
    <Text>Articles Screen</Text>
  </>
);
