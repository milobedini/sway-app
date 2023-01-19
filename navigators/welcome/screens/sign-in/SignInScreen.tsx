import { StackScreenProps } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";

import { Colours } from "../../../../colours";
import { textStyles } from "../../../../components/text";
import { WelcomeNavigatorParamsList } from "../../WelcomeNavigatorParamsList";
import { LoginForm } from "./components";
import logo from "../../../../assets/logo_black.png";

export type SignInScreenProps = StackScreenProps<
  WelcomeNavigatorParamsList,
  "signIn"
>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.dark.$,
  },
  content: {
    flex: 1,
  },
  background: { flex: 0.7, marginTop: 20 },
  title: {
    textAlign: "center",
    color: Colours.lightGrey.$,
  },
  form: {
    flexGrow: 1,
  },
  image: {
    height: 500,
    width: 800,
    resizeMode: "contain",
    alignSelf: "center",
  },
});
export const SignInScreen = ({
  navigation,
}: SignInScreenProps): JSX.Element => {
  const toHome = () => {
    navigation.getParent()?.navigate("main");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView edges={["top"]} style={styles.content}>
        <ImageBackground
          style={[styles.background]}
          source={logo}
          onLoad={() => SplashScreen.hideAsync()}
        >
          <Text style={[textStyles.title, styles.title]} onPress={toHome}>
            Sign In
          </Text>
          <LoginForm style={styles.form} />
        </ImageBackground>
      </SafeAreaView>
    </View>
  );
};
