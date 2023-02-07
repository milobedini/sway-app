import { Text, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";

import { Colours } from "../../../../../colours";
import { Fonts } from "../../../../../fonts";
import { welcomeConstants } from "./WelcomeConstants";

type DetailsProps = {
  scrollY: { value: number };
  item: { title: string; description: string };
  index: number;
};
export const Details = ({
  scrollY,
  item,
  index,
}: DetailsProps): JSX.Element => {
  const stylez = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [index - 1, index, index + 1],
        [0, 1, 0],
        Extrapolate.CLAMP
      ),
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [index - 1, index, index + 1],
            [20, 0, -20],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });
  return (
    <View
      style={[
        {
          position: "absolute",
          width: "100%",
          zIndex: welcomeConstants.data.length - index,
          overflow: "hidden",
        },
      ]}
    >
      <Animated.View style={stylez}>
        <Text
          style={{
            color: Colours.bright.$,
            fontFamily: Fonts.OpenSans_700Bold,
            fontSize: 32,
            marginBottom: welcomeConstants.spacing / 2,
            textTransform: "capitalize",
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            color: "#fff",
            fontFamily: Fonts.OpenSans_500Medium,
            fontSize: 16,
            marginBottom: welcomeConstants.spacing / 2,
          }}
        >
          {item.description}
        </Text>
        <Text
          style={{
            color: "#fff",
            fontSize: 18,
            fontFamily: Fonts.OpenSans_700Bold,
            textTransform: "uppercase",
          }}
        >
          {index !== 2 ? (
            <AntDesign
              name="arrowdown"
              size={welcomeConstants.buttonSize}
              color={Colours.bright.$}
            />
          ) : null}
        </Text>
      </Animated.View>
    </View>
  );
};
