import { createStackNavigator } from "@react-navigation/stack";

import { LearnNavigatorParamsList } from "./LearnNavigatorParamsList";
import { LearnHomeScreen } from "./screens/learn-home/LearnHomeScreen";

const Stack = createStackNavigator<LearnNavigatorParamsList>();

export const LearnNavigator = (): JSX.Element => (
  <Stack.Navigator screenOptions={{ headerTitle: "" }}>
    <Stack.Screen name="home" component={LearnHomeScreen} />
  </Stack.Navigator>
);
