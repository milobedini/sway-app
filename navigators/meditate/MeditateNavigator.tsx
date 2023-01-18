import { createStackNavigator } from "@react-navigation/stack";

import { Colours } from "../../colours";
import { MeditateNavigatorParamsList } from "./MeditateNavigatorParamsList";
import { MeditateListScreen, MeditateShowScreen } from "./screens";

const Stack = createStackNavigator<MeditateNavigatorParamsList>();

export const MeditateNavigator = (): JSX.Element => (
  <Stack.Navigator
    screenOptions={{
      headerTitle: "",
      headerBackTitleVisible: false,
      headerTintColor: Colours.bright.$,
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        backgroundColor: Colours.dark.$,
      },
    }}
  >
    <Stack.Screen
      name="list"
      component={MeditateListScreen}
      options={{ headerShown: false }}
      // options={{header: () => <MediateListScreenHeader />}}
    />
    <Stack.Screen
      name="show"
      component={MeditateShowScreen}
      options={{
        headerTransparent: true,
      }}
    />
  </Stack.Navigator>
);
