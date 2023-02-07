import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

import { Colours } from "../../../../../colours";
import { welcomeConstants } from "./WelcomeConstants";

type PaginationDotProps = {
  scrollY: { value: number };
  index: number;
};

export const PaginationDot = ({
  scrollY,
  index,
}: PaginationDotProps): JSX.Element => {
  const styles = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [index - 1, index, index + 1],
        [
          welcomeConstants.indicatorSize,
          welcomeConstants.indicatorSize * 6,
          welcomeConstants.indicatorSize,
        ],
        Extrapolate.CLAMP
      ),
    };
  });
  return (
    <Animated.View
      style={[
        {
          width: welcomeConstants.indicatorSize,
          height: welcomeConstants.indicatorSize,
          borderRadius: welcomeConstants.indicatorSize / 2,
          backgroundColor: Colours.bright.$,
          marginBottom: welcomeConstants.indicatorSize / 2,
        },
        styles,
      ]}
    />
  );
};
