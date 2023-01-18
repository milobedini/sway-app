import { createStackNavigator } from "@react-navigation/stack";

import { TimerShowScreen } from "./screens";
import { TimerNavigatorParamsList } from "./TimerNavigatorParamsList";

const Stack = createStackNavigator<TimerNavigatorParamsList>();

export const TimerNavigator = (): JSX.Element => (
  <Stack.Navigator screenOptions={{ headerTitle: "", headerShown: false }}>
    <Stack.Screen name="show" component={TimerShowScreen} />
  </Stack.Navigator>
);
