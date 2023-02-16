import { createStackNavigator } from "@react-navigation/stack";

import { MoreInfoNavigatorParamsList } from "./MoreInfoNavigatorParamsList";
import { IndexScreen } from "./screens/index/IndexScreen";
import { Colours } from "../../colours";
import { FavouritesScreen } from "./screens/favourites";
import { MeditateShowScreen } from "../meditate/screens";
import { AboutScreen } from "./screens/about/AboutScreen";
import { ContactScreen } from "./screens/contact/ContactScreen";

const Stack = createStackNavigator<MoreInfoNavigatorParamsList>();

export const MoreInfoNavigator = (): JSX.Element => (
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
      name="index"
      component={IndexScreen}
      options={{ title: "More information", headerShown: false }}
    />
    <Stack.Screen
      name="favourites"
      component={FavouritesScreen}
      options={{ headerTransparent: true, headerTintColor: Colours.bright.$ }}
    />
    <Stack.Screen
      name="show"
      component={MeditateShowScreen}
      options={{ headerTransparent: true, headerTintColor: Colours.bright.$ }}
    />
    <Stack.Screen
      name="about"
      component={AboutScreen}
      options={{ headerTransparent: true, headerTintColor: Colours.bright.$ }}
    />
    <Stack.Screen
      name="contact"
      component={ContactScreen}
      options={{ headerTransparent: true, headerTintColor: Colours.bright.$ }}
    />
  </Stack.Navigator>
);
