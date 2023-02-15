import { TextProps, TextInput } from "react-native";
import Animated, { useAnimatedProps } from "react-native-reanimated";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
export const ReText = (props: TextProps): JSX.Element => {
  // @ts-expect-error text prop.
  const { text, style } = { style: {}, ...props };
  const animatedProps = useAnimatedProps(() => {
    return {
      text: String(text.value),
      defaultValue: String(text.value),
    };
  });
  return (
    <AnimatedTextInput
      underlineColorAndroid={"transparent"}
      editable={false}
      style={style}
      animatedProps={animatedProps}
    />
  );
};
