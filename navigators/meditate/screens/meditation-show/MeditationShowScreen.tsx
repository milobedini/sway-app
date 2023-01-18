import { StackScreenProps } from "@react-navigation/stack";
import { useWindowDimensions } from "react-native";

import { MeditateNavigatorParamsList } from "../../MeditateNavigatorParamsList";
import { SmallMeditationShow } from "../../../../components/meditation-show/SmallMeditationShow";

export type MeditationShowScreenProps = StackScreenProps<
  MeditateNavigatorParamsList,
  "show"
>;

export const MeditateShowScreen = ({
  route: {
    params: { meditationId },
  },
}: MeditationShowScreenProps): JSX.Element => {
  const { width } = useWindowDimensions();

  if (width <= 480) {
    return <SmallMeditationShow meditationId={meditationId} />;
  }
  return <></>;
};
