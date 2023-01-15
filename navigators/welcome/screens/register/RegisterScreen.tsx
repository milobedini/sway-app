import { StackScreenProps } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colours } from "../../../../colours";
import { textStyles } from "../../../../components/text";
import { WelcomeNavigatorParamsList } from "../../WelcomeNavigatorParamsList";
import { RegisterForm } from "./components";

export type RegisterScreenProps = StackScreenProps<
  WelcomeNavigatorParamsList,
  "register"
>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colours.dark.$,
    paddingVertical: 24,
  },

  content: {
    flex: 1,
  },
  title: {
    textAlign: "center",
    color: Colours.lightGrey.$,
    marginTop: 40,
  },
  form: {
    flexGrow: 1,
  },
  image: {
    height: 500,
    width: 800,
    resizeMode: "contain",
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
      <SafeAreaView style={styles.content}>
        <Text style={[textStyles.title, styles.title]} onPress={onNext}>
          Sign Up
        </Text>
        <RegisterForm style={styles.form} onSuccess={onNext} />
      </SafeAreaView>
    </View>
  );
};
