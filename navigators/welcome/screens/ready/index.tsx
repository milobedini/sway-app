import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colours } from '../../../../colours';
import { textStyles } from '../../../../components/text';

import { WelcomeNavigatorParamsList } from '../../WelcomeNavigatorParamsList';

export type ReadyScreenProps = StackScreenProps<
  WelcomeNavigatorParamsList,
  'ready'
>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colours.dark.$
  }
});

export const ReadyScreen = ({ navigation }: ReadyScreenProps): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={textStyles.title}>This is the ready screen!</Text>
    </SafeAreaView>
  );
};
