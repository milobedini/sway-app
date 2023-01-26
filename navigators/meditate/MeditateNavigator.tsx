import { createStackNavigator } from "@react-navigation/stack";

import { Colours } from "../../colours";
import { MeditateNavigatorParamsList } from "./MeditateNavigatorParamsList";
import { MeditateListScreen, MeditateShowScreen } from "./screens";
import { MeditationCategoriesScreen } from "./screens/meditation-categories/MeditationCategoriesScreen";
import { MeditationMenuScreen } from "./screens/meditation-menu/MeditationMenuScreen";
import { MeditationSearchScreen } from "./screens/meditation-search/MeditationSearchScreen";

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
      name="menu"
      component={MeditationMenuScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="categories"
      component={MeditationCategoriesScreen}
      options={{ headerTransparent: true }}
    />
    <Stack.Screen
      name="list"
      component={MeditateListScreen}
      options={{ headerTransparent: true }}
    />
    <Stack.Screen
      name="show"
      component={MeditateShowScreen}
      options={{
        headerTransparent: true,
      }}
    />
    <Stack.Screen name="search" component={MeditationSearchScreen} />
  </Stack.Navigator>
);
