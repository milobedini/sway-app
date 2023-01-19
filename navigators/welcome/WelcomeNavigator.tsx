import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";

import { HeaderBackButton } from "./components/header-back-button";
import { HeaderSkipButton } from "./components/header-skip-button";
import { BreatheScreen, ReadyScreen } from "./screens";
import { GrowScreen } from "./screens/grow";
import { RegisterScreen } from "./screens/register";
import { SignInScreen } from "./screens/sign-in";
import { SitScreen } from "./screens/sit";
import { WelcomeNavigatorParamsList } from "./WelcomeNavigatorParamsList";

const Stack = createStackNavigator<WelcomeNavigatorParamsList>();
export const WelcomeNavigator = (): JSX.Element => {
  const [onboarded, setOnboarded] = useState(false);

  useEffect(() => {
    const checkOnboarded = async () => {
      try {
        const value = await AsyncStorage.getItem("onboarding");
        if (value === "true") {
          setOnboarded(true);
        }
      } catch (err) {
        return err;
      }
    };
    checkOnboarded();
  }, []);

  return (
    <Stack.Navigator>
      <>
        {!onboarded ? (
          <>
            <Stack.Screen
              name="ready"
              component={ReadyScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Group
              screenOptions={{
                headerTransparent: true,
                headerTitle: "",
                headerLeft: HeaderBackButton,
                headerRight: HeaderSkipButton,
              }}
            >
              <Stack.Screen name="breathe" component={BreatheScreen} />
              <Stack.Screen name="sit" component={SitScreen} />
              <Stack.Screen name="grow" component={GrowScreen} />
            </Stack.Group>
            <Stack.Group
              screenOptions={{
                headerTransparent: true,
                headerTitle: "",
                headerLeft: HeaderBackButton,
              }}
            >
              <Stack.Screen name="register" component={RegisterScreen} />
            </Stack.Group>
          </>
        ) : null}
        <Stack.Group
          screenOptions={{
            headerTransparent: true,
            headerTitle: "",
            headerLeft: HeaderBackButton,
          }}
        >
          <Stack.Screen name="signIn" component={SignInScreen} />
        </Stack.Group>
      </>
    </Stack.Navigator>
  );
};
