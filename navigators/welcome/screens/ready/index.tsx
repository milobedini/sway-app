import { StackScreenProps } from '@react-navigation/stack'
import { Image, StyleSheet, Text, useWindowDimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colours } from '../../../../colours'
import { textStyles } from '../../../../components/text'

import { WelcomeNavigatorParamsList } from '../../WelcomeNavigatorParamsList'
import logo from '../../../../assets/logo_black.png'

export type ReadyScreenProps = StackScreenProps<
  WelcomeNavigatorParamsList,
  'ready'
>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colours.dark.$,
  },
  image: {
    width: '100%',
    flexGrow: 1,
    resizeMode: 'contain',
  },
})

export const ReadyScreen = ({ navigation }: ReadyScreenProps): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.image} />
    </SafeAreaView>
  )
}
