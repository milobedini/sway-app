import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootNavigator } from "../root/RootNavigator";
import { AppNavigatorParamList } from "./AppNavigatorParamsList";

const Stack = createNativeStackNavigator<AppNavigatorParamList>();

export const AppNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="app" component={RootNavigator} />
    </Stack.Navigator>
  );
};
