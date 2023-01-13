import { NavigatorScreenParams } from '@react-navigation/native'
import { MainNavigatorParamList } from '../main/MainNavigatorParamsList'
import { WelcomeNavigatorParamsList } from '../welcome/WelcomeNavigatorParamsList'

export type RootNavigatorParamList = {
  welcome: NavigatorScreenParams<WelcomeNavigatorParamsList>
  main: NavigatorScreenParams<MainNavigatorParamList>
}
