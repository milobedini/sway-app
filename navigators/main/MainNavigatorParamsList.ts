import { NavigatorScreenParams } from "@react-navigation/native";
import { HomeNavigatorParamsList } from "../home/HomeNavigatorParamsList";
import { MeditateNavigatorParamsList } from "../meditate/MeditateNavigatorParamsList";

export type MainNavigatorParamList = {
  home: NavigatorScreenParams<HomeNavigatorParamsList>;
  meditate: NavigatorScreenParams<MeditateNavigatorParamsList>;
};
