import { Animated, StyleSheet, TouchableOpacity } from "react-native";

import { Colours } from "../../colours";
import logo from "../../assets/logo_black.png";

const CIRCLE_SIZE = 100;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  circleContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 8,
    paddingBottom: 100,
    backgroundColor: Colours.bright.$,
  },
  circle: {
    backgroundColor: Colours.dark.$,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  circleButton: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignSelf: "stretch",
    marginHorizontal: 50,
  },
  image: {
    borderRadius: 100,
  },
});

interface CircleProps {
  onPress: () => void;
  //   animatedValue: {interpolate : {(inputRange: [], outputRange: []}) => void};
  animatedValue: Animated.Value;
}

export const Circle = ({ onPress, animatedValue }: CircleProps) => {
  const inputRange = [0, 0.001, 0.5, 0.501, 1];
  const containerBg = animatedValue.interpolate({
    inputRange,
    outputRange: [
      Colours.dark.$,
      Colours.dark.$,
      Colours.dark.$,
      Colours.bright.$,
      Colours.bright.$,
    ],
  });
  const circleBg = animatedValue.interpolate({
    inputRange,
    outputRange: [
      Colours.bright.$,
      Colours.bright.$,
      Colours.bright.$,
      Colours.dark.$,
      Colours.dark.$,
    ],
  });

  const imageSize = animatedValue.interpolate({
    inputRange,
    outputRange: [50, 50, 80, 80, 50],
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        styles.circleContainer,
        {
          backgroundColor: containerBg,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [
              {
                // Make it look closer to camera.
                perspective: 400,
              },
              {
                rotateY: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ["0deg", "-90deg", "-180deg"],
                }),
              },
              {
                scale: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 8, 1],
                }),
              },
              {
                translateX: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  // outputRange: [0, (width * 0.5) / width, 0],
                  outputRange: [0, 0.5, 0],
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity onPress={onPress}>
          <Animated.View
            style={[
              styles.circle,
              styles.circleButton,
              { backgroundColor: circleBg },
            ]}
          >
            <Animated.Image
              source={logo}
              style={[
                styles.image,

                {
                  backgroundColor: circleBg,
                  height: imageSize,
                  width: imageSize,
                },
              ]}
            />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};
