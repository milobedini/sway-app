import { createStackNavigator } from "@react-navigation/stack";

import { Colours } from "../../colours";
import { LearnNavigatorParamsList } from "./LearnNavigatorParamsList";
import { FeedNavigator } from "./screens/feed";
import { ArticleShowScreen } from "./screens/feed/articles/ArticleShowScreen";
import { CommunityShowScreen } from "./screens/feed/community/CommunityShowScreen";
import { NewComment } from "./screens/feed/community/components/NewComment";
import { LearnHomeScreen } from "./screens/learn-home/LearnHomeScreen";
import { NotesScreen } from "./screens/notes";

const Stack = createStackNavigator<LearnNavigatorParamsList>();

export const LearnNavigator = (): JSX.Element => {
  return (
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
      initialRouteName="home"
    >
      <Stack.Screen
        name="home"
        component={LearnHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="notes" component={NotesScreen} />

      <Stack.Screen name="feed" component={FeedNavigator} />
      <Stack.Screen name="articleShow" component={ArticleShowScreen} />
      <Stack.Screen name="threadShow" component={CommunityShowScreen} />
      <Stack.Screen name="newComment" component={NewComment} />
    </Stack.Navigator>
  );
};
