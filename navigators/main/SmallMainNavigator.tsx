import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colours } from "../../colours";
import { HomeIcon } from "../../components/icons/HomeIcon";
import { HomeNavigator } from "../home";
import { TabBarButton } from "./components";
import { MainNavigatorParamList } from "./MainNavigatorParamsList";

const Tab = createBottomTabNavigator<MainNavigatorParamList>();

export const SmallMainNavigator = (): JSX.Element => {
  const { bottom } = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colours.bright.$,
          paddingTop: 4,
          paddingBottom: bottom ? bottom / 2 : 8,
          height: 76 + bottom / 2,
          borderTopWidth: 0,
          shadowOpacity: 0.3,
          shadowColor: Colours.bright.$,
          shadowRadius: 36,
          shadowOffset: { width: 0, height: 6 },
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarButton icon={HomeIcon} focussed={focused} />
          ),
        }}
      />
      {/* Meditate */}
      {/* Timer */}
      {/* Notes, Articles & Community */}
      {/* Show More - Progress, Help, Logout */}
    </Tab.Navigator>
  );
};
