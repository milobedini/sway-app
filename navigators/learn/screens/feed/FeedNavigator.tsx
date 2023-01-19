import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StackScreenProps } from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colours } from "../../../../colours";
import { HomeIcon } from "../../../../components/icons";
import { TabBarButton } from "../../../main/components";
import { LearnNavigatorParamsList } from "../../LearnNavigatorParamsList";
import { ArticleFeed } from "./articles/ArticleFeedScreen";
import { CommunityFeed } from "./community/CommunityFeedScreen";

const Tab = createBottomTabNavigator<LearnNavigatorParamsList>();
export type CommunityScreenProps = StackScreenProps<
  LearnNavigatorParamsList,
  "feed"
>;

// export const CommunityScreen = ({
//   // eslint-disable-next-line
//   navigation,
//   // eslint-disable-next-line
//   route: { params },
// }: CommunityScreenProps): JSX.Element => <></>;

export const FeedNavigator = (): JSX.Element => {
  const { bottom } = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingTop: 4,
          paddingBottom: bottom ? bottom / 2 : 8,
          height: 76 + bottom / 6,
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
        name="community"
        component={CommunityFeed}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarButton icon={HomeIcon} focussed={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="articles"
        component={ArticleFeed}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarButton icon={HomeIcon} focussed={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
