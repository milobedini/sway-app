import "react-native-gesture-handler";
import { LinkingOptions, NavigationContainer } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";

import { FontsContainer } from "./components/fonts-container";
import { AppNavigator, AppNavigatorParamList } from "./navigators/app";
import store from "./lib/redux/store";

const prefix = Linking.createURL("/");

const App = (): JSX.Element => {
  const linking: LinkingOptions<AppNavigatorParamList> = {
    prefixes: [prefix],
    config: {
      screens: {
        app: {
          path: "app",
          screens: {
            welcome: {
              path: "welcome",
              // screens: {
              //   signInMagic: {
              //     path: 'sign-in-magic'
              //   }
              // }
            },
            main: {
              screens: {
                home: {
                  screens: {
                    homepage: {
                      path: "home",
                    },
                  },
                },
                // planner: {
                //   path: 'plan',
                //   screens: {
                //     plan: ':date',
                //     addRecipe: {
                //       path: ':date/add-recipe'
                //     }
                //   }
                // },
                // recipes: {
                //   screens: {
                //     show: {
                //       path: 'recipes/:recipeId'
                //     },
                //     list: {
                //       path: 'recipes'
                //     }
                //   }
                // },
                // 'shopping-list': 'shopping-list',
                // 'more-info': {
                //   path: 'more-info',
                //   screens: {
                //     index: '',
                //     'delete-account': 'delete-account'
                //   }
                // }
              },
            },
          },
        },
      },
    },
  };

  return (
    <Provider store={store}>
      <StatusBar
        backgroundColor={"blue"}
        barStyle="light-content"
        translucent
      />
      <NavigationContainer linking={linking}>
        <FontsContainer>
          <AppNavigator />
        </FontsContainer>
      </NavigationContainer>
    </Provider>
  );
};
export default App;
