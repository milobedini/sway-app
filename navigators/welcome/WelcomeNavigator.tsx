import { NavigationProp, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { HeaderBackButton } from './components/header-back-button'
import { HeaderSkipButton } from './components/header-skip-button'
import { BreatheScreen, ReadyScreen } from './screens'
import { GrowScreen } from './screens/grow'
import { SignInScreen } from './screens/sign-in'
import { SitScreen } from './screens/sit'
import { WelcomeNavigatorParamsList } from './WelcomeNavigatorParamsList'

const Stack = createStackNavigator<WelcomeNavigatorParamsList>()
export const WelcomeNavigator = (): JSX.Element => {
  const [init, setInit] = useState(true)
  //   change below to global settings
  const [tourComplete, setTourComplete] = useState(false)

  const navigation = useNavigation<NavigationProp<WelcomeNavigatorParamsList>>()

  useEffect(() => {
    if (!init) {
      return
    }
    if (tourComplete) {
      console.log('navigate as Tour complete')
      //   navigate to sign in
    }
    setInit(false)
  }, [init])

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
          screenOptions={{
            headerTransparent: true,
            headerTitle: '',
            headerLeft: HeaderBackButton,
            headerRight: HeaderSkipButton,
          }}
        >
          <Stack.Screen name="breathe" component={BreatheScreen} />
          <Stack.Screen name="sit" component={SitScreen} />
          <Stack.Screen name="grow" component={GrowScreen} />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            headerTransparent: true,
            headerTitle: '',
            headerLeft: HeaderBackButton,
          }}
        >
          <Stack.Screen name="signIn" component={SignInScreen} />
        </Stack.Group>
      </>
    </Stack.Navigator>
  )
}
