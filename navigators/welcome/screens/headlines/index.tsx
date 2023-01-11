import { StackScreenProps } from '@react-navigation/stack';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WelcomeNavigatorParamsList } from '../../WelcomeNavigatorParamsList';

export type HeadlinesScreenProps = StackScreenProps<
  WelcomeNavigatorParamsList,
  'headlines'
>;

export const HeadlinesScreen = ({
  navigation
}: HeadlinesScreenProps): JSX.Element => {
  return (
    <SafeAreaView>
      <Text>This is the headlines screen!</Text>
    </SafeAreaView>
  );
};
