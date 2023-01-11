import { StackScreenProps } from '@react-navigation/stack';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WelcomeNavigatorParamsList } from '../../WelcomeNavigatorParamsList';

export type ReadyScreenProps = StackScreenProps<
  WelcomeNavigatorParamsList,
  'ready'
>;

export const ReadyScreen = ({ navigation }: ReadyScreenProps): JSX.Element => {
  return (
    <SafeAreaView>
      <Text>This is the ready screen!</Text>
    </SafeAreaView>
  );
};
