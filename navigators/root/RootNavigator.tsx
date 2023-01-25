import { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useRoute } from "@react-navigation/native";
import Modal from "react-native-modal";
import { View } from "react-native";

import { WelcomeNavigator } from "../welcome/WelcomeNavigator";
import { MainNavigator } from "../main/MainNavigator";
import { getUserId } from "../../lib/auth/auth";
import { RootNavigatorParamList } from "./RootNavigatorParamList";
import { LoadingIndicator } from "../../components/loading-animation";

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

export const RootNavigator = (): JSX.Element => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [signedOut, setSignedOut] = useState(false);
  const [checking, setChecking] = useState(true);

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
      } finally {
        setChecking(false);
      }
    };
    if (route.params !== undefined) {
      setSignedOut(true);
    }

    checkLoggedIn();
  }, []);
  if (checking) {
    return <View style={{ flex: 1 }} />;
  }
  return (
    <>
      <Modal
        isVisible={checking}
        // // animationOut="fadeOut"
        // animationIn={"fadeIn"}
        // animationInTiming={3000}
        // // animationOutTiming={3000}
        style={{ flex: 1, width: "100%", margin: 0, padding: 0 }}
      >
        <LoadingIndicator marginBottom={0} />
      </Modal>
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
    </>
  );
};
