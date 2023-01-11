import { NavigationProp, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { HeadlinesScreen, ReadyScreen } from './screens';
import { WelcomeNavigatorParamsList } from './WelcomeNavigatorParamsList';

const Stack = createStackNavigator<WelcomeNavigatorParamsList>();
export const WelcomeNavigator = (): JSX.Element => {
  const [init, setInit] = useState(true);
  //   change below to global settings
  const [tourComplete, setTourComplete] = useState(false);

  const navigation =
    useNavigation<NavigationProp<WelcomeNavigatorParamsList>>();

  useEffect(() => {
    if (!init) {
      return;
    }
    if (tourComplete) {
      console.log('navigate as Tour complete');
      //   navigate to sign in
    }
    setInit(false);
  }, [init]);

  return (
    <Stack.Navigator>
      {/* {Platform.OS !== 'web' && ( */}
      <>
        <Stack.Screen
          name="ready"
          component={ReadyScreen}
          options={{ headerShown: false }}
        />
        <Stack.Group
          screenOptions={{ headerTransparent: true, headerTitle: '' }}
        >
          <Stack.Screen name="headlines" component={HeadlinesScreen} />
        </Stack.Group>
      </>
    </Stack.Navigator>
  );
};
