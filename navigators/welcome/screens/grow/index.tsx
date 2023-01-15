import { StackScreenProps } from "@react-navigation/stack";

import { NextButton } from "../../components/next-button";
import { TourScreen } from "../../components/tour-screen";
import { WelcomeNavigatorParamsList } from "../../WelcomeNavigatorParamsList";
import imageSource from "../../../../assets/hero_mob_2.png";

export type GrowScreenProps = StackScreenProps<
  WelcomeNavigatorParamsList,
  "grow"
>;

export const GrowScreen = ({ navigation }: GrowScreenProps): JSX.Element => {
  const register = () => {
    // set tour complete to true
    // navigate to sign in
    navigation.navigate("register");
  };

  return (
    <TourScreen
      pageNumber={3}
      imageSource={imageSource}
      title="Grow"
      body="We have a supportive community, allowing our members to connect with like-minded people and reach out to ask questions or share stories. Ready to get started? Let’s begin your journey to a more mindful life."
    >
      <NextButton title="Sign up now!" onNext={register} />
    </TourScreen>
  );
};
