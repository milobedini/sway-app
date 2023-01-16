import { createStackNavigator } from "@react-navigation/stack";

import { MeditateNavigatorParamsList } from "./MeditateNavigatorParamsList";
import { MeditateListScreen, MeditateShowScreen } from "./screens";

const Stack = createStackNavigator<MeditateNavigatorParamsList>();

export const MeditateNavigator = (): JSX.Element => (
  <Stack.Navigator screenOptions={{ headerTitle: "" }}>
    <Stack.Screen
      name="list"
      component={MeditateListScreen}
      // options={{header: () => <MediateListScreenHeader />}}
    />
    <Stack.Screen name="show" component={MeditateShowScreen} />
  </Stack.Navigator>
);
