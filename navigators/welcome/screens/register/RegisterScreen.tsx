import { StackScreenProps } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colours } from "../../../../colours";
import { textStyles } from "../../../../components/text";
import { Fonts } from "../../../../fonts";
import { WelcomeNavigatorParamsList } from "../../WelcomeNavigatorParamsList";
import { RegisterForm } from "./components";

export type RegisterScreenProps = StackScreenProps<
  WelcomeNavigatorParamsList,
  "register"
>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colours.dark.$,
  },

  title: {
    textAlign: "center",
    color: Colours.lightGrey.$,
    marginTop: 40,
  },
  haveAccount: {
    color: Colours.bright.$,
    fontFamily: Fonts.OpenSans_700Bold,
    textAlign: "center",
    marginTop: "-10%",
  },
});
export const RegisterScreen = ({
  navigation,
}: RegisterScreenProps): JSX.Element => {
  const onNext = () => {
    navigation.navigate("signIn");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView edges={["top", "bottom"]}>
        <Text style={[textStyles.title, styles.title]}>Sign Up</Text>
        <RegisterForm onSuccess={onNext} />
        <Text style={styles.haveAccount} onPress={onNext}>
          Already have an account?
        </Text>
      </SafeAreaView>
    </View>
  );
};