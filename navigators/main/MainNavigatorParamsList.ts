import { NavigatorScreenParams } from "@react-navigation/native";
import { HomeNavigatorParamsList } from "../home/HomeNavigatorParamsList";
import { LearnNavigatorParamsList } from "../learn/LearnNavigatorParamsList";
import { MeditateNavigatorParamsList } from "../meditate/MeditateNavigatorParamsList";
import { MoreInfoNavigatorParamsList } from "../more-info/MoreInfoNavigatorParamsList";
import { TimerNavigatorParamsList } from "../timer/TimerNavigatorParamsList";

export type MainNavigatorParamList = {
  home: NavigatorScreenParams<HomeNavigatorParamsList>;
  meditate: NavigatorScreenParams<MeditateNavigatorParamsList>;
  timer: NavigatorScreenParams<TimerNavigatorParamsList>;
  learn: NavigatorScreenParams<LearnNavigatorParamsList>;
  "more-info": NavigatorScreenParams<MoreInfoNavigatorParamsList>;
};
