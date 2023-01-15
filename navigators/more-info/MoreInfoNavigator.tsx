import { createStackNavigator } from "@react-navigation/stack";

import { Colours } from "../../colours";
import { Fonts } from "../../fonts";
import { MoreInfoNavigatorParamsList } from "./MoreInfoNavigatorParamsList";
import { IndexScreen } from "./screens/index/IndexScreen";
import { ProfileScreen } from "./screens/profile/ProfileScreen";

const Stack = createStackNavigator<MoreInfoNavigatorParamsList>();

export const MoreInfoNavigator = (): JSX.Element => (
  <Stack.Navigator
    screenOptions={{
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontFamily: Fonts.OpenSans_700Bold,
        fontSize: 20,
        color: Colours.lightGrey.$,
        letterSpacing: -0.2,
      },
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        backgroundColor: Colours.dark.$,
      },
      headerBackTitleVisible: false,
      headerTintColor: Colours.bright.$,
    }}
  >
    <Stack.Screen
      name="index"
      component={IndexScreen}
      options={{ title: "More information" }}
    />
    <Stack.Screen
      name="profile"
      component={ProfileScreen}
      options={{ title: "Profile" }}
    />
  </Stack.Navigator>
);
