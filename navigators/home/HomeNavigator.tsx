import { createStackNavigator } from "@react-navigation/stack";

import { HomeNavigatorParamsList } from "./HomeNavigatorParamsList";
import { HomeScreen } from "./screens";

const Stack = createStackNavigator<HomeNavigatorParamsList>();

export const HomeNavigator = (): JSX.Element => (
  <Stack.Navigator
    screenOptions={{
      headerTransparent: true,
      headerTitle: "",
      headerShown: false,
    }}
  >
    <Stack.Screen name="homepage" component={HomeScreen} />
  </Stack.Navigator>
);
