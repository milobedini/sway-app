import { NavigatorScreenParams } from '@react-navigation/native';
import { RootNavigatorParamList } from '../root/RootNavigatorParamList';

export type AppNavigatorParamList = {
  app: NavigatorScreenParams<RootNavigatorParamList>;
};
