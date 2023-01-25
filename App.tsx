import "./warnings.ts";
import "react-native-gesture-handler";
import {
  DefaultTheme,
  LinkingOptions,
  NavigationContainer,
} from "@react-navigation/native";
import * as Linking from "expo-linking";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import Toast from "react-native-toast-message";

import { FontsContainer } from "./components/fonts-container";
import { AppNavigator, AppNavigatorParamList } from "./navigators/app";
import store from "./lib/redux/store";
import { Colours } from "./colours";
import { toastConfig } from "./components/toast/ToastConfig";

const prefix = Linking.createURL("/");

const navTheme = DefaultTheme;
navTheme.colors.background = Colours.dark.$;

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
      <NavigationContainer
        linking={linking}
        theme={navTheme}
        //  onReady=Loading State here?
      >
        <FontsContainer>
          <AppNavigator />
        </FontsContainer>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </Provider>
  );
};
export default App;
