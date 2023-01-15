import { StackScreenProps } from "@react-navigation/stack";

import { TourScreen } from "../../components/tour-screen";
import { WelcomeNavigatorParamsList } from "../../WelcomeNavigatorParamsList";
import imageSource from "../../../../assets/hero_mob_3.png";
import { NextButton } from "../../components/next-button";

export type SitScreenProps = StackScreenProps<
  WelcomeNavigatorParamsList,
  "sit"
>;

export const SitScreen = ({ navigation }: SitScreenProps): JSX.Element => {
  const onNext = () => {
    navigation.push("grow"), [navigation];
  };

  return (
    <TourScreen
      pageNumber={2}
      imageSource={imageSource}
      title="Sit"
      body="Our goal is to help you create a regular meditation practice and give you the tools to become the best version of yourself. We offer guided meditation sessions, tips and techniques to help you get the most out of your practice."
    >
      <NextButton onNext={onNext} />
    </TourScreen>
  );
};
