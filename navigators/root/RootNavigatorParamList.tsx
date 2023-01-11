import { NavigatorScreenParams } from '@react-navigation/native';
import { WelcomeNavigatorParamsList } from '../welcome/WelcomeNavigatorParamsList';

export type RootNavigatorParamList = {
  welcome: NavigatorScreenParams<WelcomeNavigatorParamsList>;
};
