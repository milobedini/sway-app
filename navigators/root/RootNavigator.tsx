import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";

import { getUserId } from "../../lib/auth/auth";
import { MainNavigator } from "../main/MainNavigator";
import { WelcomeNavigator } from "../welcome/WelcomeNavigator";
import { RootNavigatorParamList } from "./RootNavigatorParamList";

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

export const RootNavigator = (): JSX.Element => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const userId = await getUserId();
        if (userId) {
          setLoggedIn(true);
        }
      } catch (err) {
        return err;
      }
    };
    checkLoggedIn();
  }, []);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {loggedIn ? (
        <>
          <Stack.Screen name="main" component={MainNavigator} />
          <Stack.Screen name="welcome" component={WelcomeNavigator} />
        </>
      ) : (
        <>
          <Stack.Screen name="welcome" component={WelcomeNavigator} />
          <Stack.Screen name="main" component={MainNavigator} />
        </>
      )}
    </Stack.Navigator>
  );
};
