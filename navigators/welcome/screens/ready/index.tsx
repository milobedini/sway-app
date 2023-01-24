import { StackScreenProps } from "@react-navigation/stack";
import { Image, StyleSheet, Text, View, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";

import { Colours } from "../../../../colours";
import { textStyles } from "../../../../components/text";
import { WelcomeNavigatorParamsList } from "../../WelcomeNavigatorParamsList";
import logo from "../../../../assets/logo_black.png";
import { PrimaryButton } from "../../../../components/primary-button";
import { Circle } from "../../../../components/circle-animation";

export type ReadyScreenProps = StackScreenProps<
  WelcomeNavigatorParamsList,
  "ready"
>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 24,
    backgroundColor: Colours.dark.$,
  },
  image: {
    height: 500,
    width: 800,
    resizeMode: "contain",
  },
  title: {
    color: Colours.lightGrey.$,
  },
  button: {
    alignSelf: "stretch",
    marginHorizontal: 50,
  },
});

export const ReadyScreen = ({ navigation }: ReadyScreenProps): JSX.Element => {
  const [started, setStarted] = useState(false);
  const onGetStarted = () => {
    setStarted(true);
    onPress();
    setTimeout(() => {
      navigation.push("breathe"), [navigation];
    }, 3000);
  };

  const animatedValue = useRef(new Animated.Value(0)).current;
  const animation = (toValue: number) =>
    Animated.timing(animatedValue, {
      toValue,
      duration: 3000,
      useNativeDriver: false,
    });

  const [index, setIndex] = useState(0);
  const onPress = () => {
    setIndex(index === 1 ? 0 : 1);
    animation(index === 1 ? 0 : 1).start();
  };
  if (!started) {
    return (
      <SafeAreaView style={styles.container}>
        <Image
          source={logo}
          style={styles.image}
          onLoad={() => SplashScreen.hideAsync()}
        />
        <Text style={[textStyles.title, styles.title]}>Welcome to Sway</Text>
        <PrimaryButton
          title="Get Started!"
          onPress={onGetStarted}
          style={styles.button}
        />
        {/* <Circle onPress={onPress} animatedValue={animatedValue} /> */}
      </SafeAreaView>
    );
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" hidden />
      <Circle onPress={onPress} animatedValue={animatedValue} />
    </View>
  );
};
