import { createStackNavigator } from "@react-navigation/stack";

import { Colours } from "../../colours";
import { MeditateShowScreen } from "../meditate/screens";
import { MeditationSearchScreen } from "../meditate/screens/meditation-search/MeditationSearchScreen";
import { HomeNavigatorParamsList } from "./HomeNavigatorParamsList";
import { HomeScreen } from "./screens";

const Stack = createStackNavigator<HomeNavigatorParamsList>();

export const HomeNavigator = (): JSX.Element => (
  <Stack.Navigator
    screenOptions={{
      headerTitle: "",
      headerTransparent: true,
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
      name="homepage"
      component={HomeScreen}
      options={{
        headerLeftContainerStyle: { display: "none" },
      }}
    />
    <Stack.Screen
      name="show"
      component={MeditateShowScreen}
      options={{ headerTransparent: true, headerTintColor: Colours.bright.$ }}
    />
    <Stack.Screen name="search" component={MeditationSearchScreen} />
  </Stack.Navigator>
);
