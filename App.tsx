import 'react-native-gesture-handler'
import { LinkingOptions, NavigationContainer } from '@react-navigation/native'
import * as Linking from 'expo-linking'
import { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { FontsContainer } from './components/fonts-container'
import { AppNavigator, AppNavigatorParamList } from './navigators/app'

const prefix = Linking.createURL('/')

export type AppProps = LaunchArguments

const App = (props: AppProps): JSX.Element => {
  const [init, setInit] = useState(true)

  useEffect(() => {
    if (!init) return

    if (props.reset) {
      console.log('Resetting')
      // clear all settings
    }
    setInit(false)
  }, [init])

  const linking: LinkingOptions<AppNavigatorParamList> = {
    prefixes: [prefix],
    config: {
      screens: {
        app: {
          path: 'app',
          screens: {
            welcome: {
              path: 'welcome',
              // screens: {
              //   signInMagic: {
              //     path: 'sign-in-magic'
              //   }
              // }
            },
            // main: {
            //   screens: {
            //     home: {
            //       screens: {
            //         homepage: {
            //           path: 'home'
            //         }
            //       }
            //     },
            //     planner: {
            //       path: 'plan',
            //       screens: {
            //         plan: ':date',
            //         addRecipe: {
            //           path: ':date/add-recipe'
            //         }
            //       }
            //     },
            //     recipes: {
            //       screens: {
            //         show: {
            //           path: 'recipes/:recipeId'
            //         },
            //         list: {
            //           path: 'recipes'
            //         }
            //       }
            //     },
            //     'shopping-list': 'shopping-list',
            //     'more-info': {
            //       path: 'more-info',
            //       screens: {
            //         index: '',
            //         'delete-account': 'delete-account'
            //       }
            //     }
            //   }
            // }
          },
        },
      },
    },
  }
  return (
    <>
      <StatusBar
        backgroundColor={'blue'}
        barStyle="light-content"
        translucent
      />
      <NavigationContainer linking={linking}>
        <FontsContainer>
          <AppNavigator />
        </FontsContainer>
      </NavigationContainer>
    </>
  )
}

export default App
