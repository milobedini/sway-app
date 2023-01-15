import { createStackNavigator } from "@react-navigation/stack";

import { MeditateNavigatorParamsList } from "./MeditateNavigatorParamsList";
import { MeditateListScreen } from "./screens";

const Stack = createStackNavigator<MeditateNavigatorParamsList>();

export const MeditateNavigator = (): JSX.Element => (
  <Stack.Navigator screenOptions={{ headerTitle: "" }}>
    <Stack.Screen
      name="list"
      component={MeditateListScreen}
      // options={{header: () => <MediateListScreenHeader />}}
    />
  </Stack.Navigator>
);
