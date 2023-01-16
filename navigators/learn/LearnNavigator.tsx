import { createStackNavigator } from "@react-navigation/stack";

import { LearnNavigatorParamsList } from "./LearnNavigatorParamsList";
import { ArticlesScreen } from "./screens/articles";
import { CommunityScreen } from "./screens/community";
import { LearnHomeScreen } from "./screens/learn-home/LearnHomeScreen";
import { NotesScreen } from "./screens/notes";

const Stack = createStackNavigator<LearnNavigatorParamsList>();

export const LearnNavigator = (): JSX.Element => (
  <Stack.Navigator screenOptions={{ headerTitle: "" }}>
    <Stack.Screen name="home" component={LearnHomeScreen} />
    <Stack.Screen name="notes" component={NotesScreen} />
    <Stack.Screen name="articles" component={ArticlesScreen} />
    <Stack.Screen name="community" component={CommunityScreen} />
  </Stack.Navigator>
);
