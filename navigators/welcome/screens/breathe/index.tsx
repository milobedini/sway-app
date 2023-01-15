import { StackScreenProps } from "@react-navigation/stack";

import { NextButton } from "../../components/next-button";
import { TourScreen } from "../../components/tour-screen";
import { WelcomeNavigatorParamsList } from "../../WelcomeNavigatorParamsList";
import imageSource from "../../../../assets/hero_mob.png";

export type BreatheScreenProps = StackScreenProps<
  WelcomeNavigatorParamsList,
  "breathe"
>;

export const BreatheScreen = ({
  navigation,
}: BreatheScreenProps): JSX.Element => {
  const onNext = () => {
    navigation.push("sit"), [navigation];
  };

  return (
    <TourScreen
      pageNumber={1}
      smallStatusBarStyle="dark"
      imageSource={imageSource}
      title="Breathe"
      body="We believe that meditation is the key to a better, healthier life. By taking the time to relax, center, and focus on yourself, you can create a more positive and peaceful state of mind. Our app is designed to help you relax, de-stress, and find your inner calm."
    >
      <NextButton onNext={onNext} />
    </TourScreen>
  );
};
