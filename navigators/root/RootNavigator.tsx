import { useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";

import { getUserId } from "../../lib/auth/auth";
import { MainNavigator } from "../main/MainNavigator";
import { WelcomeNavigator } from "../welcome/WelcomeNavigator";
import { RootNavigatorParamList } from "./RootNavigatorParamList";

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

export const RootNavigator = (): JSX.Element => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [signedOut, setSignedOut] = useState(false);

  const route = useRoute();

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
    if (route.params !== undefined) {
      setSignedOut(true);
    }

    checkLoggedIn();
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {loggedIn && !signedOut ? (
        <>
          <Stack.Screen name="main" component={MainNavigator} />
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
