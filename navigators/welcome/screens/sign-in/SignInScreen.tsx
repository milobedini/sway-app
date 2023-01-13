import { StackScreenProps } from '@react-navigation/stack'
import { StatusBar } from 'expo-status-bar'
import { Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colours } from '../../../../colours'
import { textStyles } from '../../../../components/text'
import { WelcomeNavigatorParamsList } from '../../WelcomeNavigatorParamsList'
import { LoginForm } from './components'
import logo from '../../../../assets/logo_black.png'

export type SignInScreenProps = StackScreenProps<
  WelcomeNavigatorParamsList,
  'signIn'
>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colours.dark.$,
    paddingVertical: 24,
  },

  content: {
    flex: 1,
    alignItems: 'stretch',
    padding: 26,
  },
  title: {
    textAlign: 'center',
    color: Colours.lightGrey.$,
    marginTop: 40,
  },
  form: {
    flexGrow: 1,
  },
  image: {
    height: 500,
    width: 800,
    resizeMode: 'contain',
  },
})
export const SignInScreen = ({
  navigation,
}: SignInScreenProps): JSX.Element => {
  const onNext = () => {
    console.log('LOGGING IN')
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.content}>
        <Text style={[textStyles.title, styles.title]}>Sign In</Text>
        <LoginForm style={styles.form} onSuccess={onNext} />
        <Image source={logo} style={styles.image} />
      </SafeAreaView>
    </View>
  )
}
