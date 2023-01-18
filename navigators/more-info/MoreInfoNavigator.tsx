import { createStackNavigator } from "@react-navigation/stack";

import { MoreInfoNavigatorParamsList } from "./MoreInfoNavigatorParamsList";
import { IndexScreen } from "./screens/index/IndexScreen";
import { Colours } from "../../colours";
import { FavouritesScreen } from "./screens/favourites";

const Stack = createStackNavigator<MoreInfoNavigatorParamsList>();

export const MoreInfoNavigator = (): JSX.Element => (
  <Stack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerTintColor: Colours.bright.$,
      headerTitle: "",
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
  </Stack.Navigator>
);
