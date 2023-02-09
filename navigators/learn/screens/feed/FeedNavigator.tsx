import { StackScreenProps } from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { Colours } from "../../../../colours";
import { ArticlesIcon } from "../../../../components/icons/ArticlesIcon";
import { CommunityIcon } from "../../../../components/icons/CommunityIcon";
import { TabBarButton } from "../../../main/components";
import { LearnNavigatorParamsList } from "../../LearnNavigatorParamsList";
import { ArticleFeed } from "./articles/ArticleFeedScreen";
import { CommunityFeedScreen } from "./community/CommunityFeedScreen";
import { Fonts } from "../../../../fonts";

const Tab = createMaterialTopTabNavigator<LearnNavigatorParamsList>();
export type CommunityScreenProps = StackScreenProps<
  LearnNavigatorParamsList,
  "feed"
>;

export const FeedNavigator = (): JSX.Element => {
  const { top } = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          marginTop: 20,
          fontFamily: Fonts.OpenSans_700Bold,
          color: "white",
          textAlign: "center",
        },
        tabBarContentContainerStyle: {
          alignItems: "center",
        },
        tabBarIndicatorStyle: { backgroundColor: Colours.bright.$ },
        tabBarStyle: {
          paddingTop: top,
          height: 88 + top,
          borderTopWidth: 0,
          shadowOpacity: 0.3,
          shadowColor: "#34715D",
          shadowRadius: 36,
          shadowOffset: { width: 0, height: 6 },
          backgroundColor: Colours.darkButton.$,
        },
      }}
    >
      <Tab.Screen
        name="articles"
        component={ArticleFeed}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarButton icon={ArticlesIcon} focussed={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="community"
        component={CommunityFeedScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarButton icon={CommunityIcon} focussed={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
