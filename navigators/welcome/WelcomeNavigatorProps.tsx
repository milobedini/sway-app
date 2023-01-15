import { StackScreenProps } from "@react-navigation/stack";

import { RootNavigatorParamList } from "../root/RootNavigatorParamList";

export type WelcomeNavigatorProps = StackScreenProps<
  RootNavigatorParamList,
  "welcome"
>;
