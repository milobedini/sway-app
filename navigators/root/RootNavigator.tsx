import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeNavigator } from '../welcome/WelcomeNavigator';
import { RootNavigatorParamList } from './RootNavigatorParamList';

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

export const RootNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" component={WelcomeNavigator} />
    </Stack.Navigator>
  );
};
