import { createStackNavigator } from "@react-navigation/stack";

import { TimerShowScreen } from "./screens";
import { TimerNavigatorParamsList } from "./TimerNavigatorParamsList";

const Stack = createStackNavigator<TimerNavigatorParamsList>();

export const TimerNavigator = (): JSX.Element => (
  <Stack.Navigator screenOptions={{ headerTitle: "" }}>
    <Stack.Screen name="show" component={TimerShowScreen} />
    {/* // options={{header: () => <TimerListScreenHeader />}} */}
  </Stack.Navigator>
);
