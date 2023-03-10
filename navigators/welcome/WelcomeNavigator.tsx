import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";

import { HeaderBackButton } from "./components/header-back-button";
import { HeaderSkipButton } from "./components/header-skip-button";
import { ReadyScreen } from "./screens";
import { RegisterScreen } from "./screens/register";
import { SignInScreen } from "./screens/sign-in";
import { WelcomeCarousel } from "./screens/welcome-carousel";
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
              <Stack.Screen
                name="welcomeCarousel"
                component={WelcomeCarousel}
                options={{
                  headerShown: false,
                  animationEnabled: false,
                }}
              />
            </Stack.Group>
            <Stack.Group
              screenOptions={{
                headerTransparent: true,
                headerTitle: "",
                headerLeft: HeaderBackButton,
                headerShown: false,
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
            headerShown: false,
          }}
        >
          <Stack.Screen name="signIn" component={SignInScreen} />
          {/* <Stack.Screen name="register" component={RegisterScreen} /> */}
        </Stack.Group>
      </>
    </Stack.Navigator>
  );
};
