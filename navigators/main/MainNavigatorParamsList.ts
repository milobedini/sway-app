import { NavigatorScreenParams } from '@react-navigation/native'
import { HomeNavigatorParamsList } from '../home/HomeNavigatorParamsList'

export type MainNavigatorParamList = {
  home: NavigatorScreenParams<HomeNavigatorParamsList>
}
