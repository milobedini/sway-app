import { StackScreenProps } from '@react-navigation/stack'
import { Image, StyleSheet, Text, useWindowDimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colours } from '../../../../colours'
import { textStyles } from '../../../../components/text'

import { WelcomeNavigatorParamsList } from '../../WelcomeNavigatorParamsList'
import logo from '../../../../assets/logo_black.png'
import { PrimaryButton } from '../../../../components/primary-button'
import { useCallback } from 'react'

export type ReadyScreenProps = StackScreenProps<
  WelcomeNavigatorParamsList,
  'ready'
>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: Colours.dark.$,
  },
  image: {
    height: 500,
    width: 800,
    resizeMode: 'contain',
  },
  title: {
    color: Colours.lightGrey.$,
  },
  button: {
    alignSelf: 'stretch',
    marginHorizontal: 50,
  },
})

export const ReadyScreen = ({ navigation }: ReadyScreenProps): JSX.Element => {
  const onGetStarted = () => {
    navigation.push('headlines'), [navigation]
  }
  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.image} />
      <Text style={[textStyles.title, styles.title]}>Welcome to Sway</Text>
      <PrimaryButton
        title="Get Started!"
        onPress={onGetStarted}
        style={styles.button}
      />
    </SafeAreaView>
  )
}
