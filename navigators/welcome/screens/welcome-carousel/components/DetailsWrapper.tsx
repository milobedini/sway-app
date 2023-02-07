import { View } from "react-native";

import { Details } from "./Details";
import { welcomeConstants, WelcomeDataType } from "./WelcomeConstants";

type DetailsWrapperProps = {
  scrollY: { value: number };
  data: WelcomeDataType[];
};
export const DetailsWrapper = ({ scrollY, data }: DetailsWrapperProps) => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        top: "60%",
        alignItems: "center",
        left: welcomeConstants.spacing * 2 + welcomeConstants.indicatorSize,
        right: welcomeConstants.spacing,
      }}
      pointerEvents="none"
    >
      {data.map((item, index) => {
        return (
          <Details key={item.key} item={item} index={index} scrollY={scrollY} />
        );
      })}
    </View>
  );
};
