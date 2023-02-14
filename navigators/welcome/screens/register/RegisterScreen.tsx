import { StackScreenProps } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  ViewProps,
} from "react-native";
import { Formik } from "formik";
import { MotiView, MotiText, useDynamicAnimation } from "moti";
import Constants from "expo-constants";
import * as yup from "yup";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Video } from "expo-av";
import { useCallback, useMemo, useRef, useState } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LoginLogo } from "../sign-in/components/LoginLogo";
import { Colours } from "../../../../colours";
import { Fonts } from "../../../../fonts";
import { WelcomeNavigatorParamsList } from "../../WelcomeNavigatorParamsList";
import { loginConstants } from "../sign-in/components/loginConstants";
import { RegisterFormValues } from "./components/register-form/RegisterFormValues";
import { baseUrl } from "../../../../lib/api/api";
import { Normalisers, TextField } from "../../../../components/text-field";
import { nameof } from "../../components/name-of";
import { validate } from "./components/register-form/validate";

export type RegisterScreenProps = StackScreenProps<
  WelcomeNavigatorParamsList,
  "register"
>;

const { width, height } = Dimensions.get("screen");

export type RegisterFormProps = Omit<ViewProps, "children"> & {
  onSuccess(emailAddress: string): void;
};
const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().required(),
  password: yup.string().min(6).required(),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required(),
});
export const RegisterScreen = ({
  navigation,
}: RegisterScreenProps): JSX.Element => {
  const initialValues: RegisterFormValues = {
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
  };
  // eslint-disable-next-line
  const [inProgress, setInProgress] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState("");

  const bottomSheetModalRef = useRef(null);
  const dynamicAnimation = useDynamicAnimation(() => ({
    opacity: 0,
    translateY: 40,
  }));

  // variables
  const snapPoints = useMemo(() => ["100%"], []);

  // callbacks
  const showModal = useCallback(() => {
    //@ts-expect-error ref
    bottomSheetModalRef.current?.present();
    setTimeout(
      () =>
        dynamicAnimation.animateTo((current) => ({
          ...current,
          opacity: 1,
          translateY: 0,
        })),
      200
    );
  }, []);

  const hideModal = useCallback(() => {
    //@ts-expect-error ref
    bottomSheetModalRef.current?.dismiss();
    dynamicAnimation.animateTo((current) => ({
      ...current,
      opacity: 0,
      translateY: 40,
    }));
  }, []);

  return (
    <BottomSheetModalProvider>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <Video
          shouldPlay
          isLooping
          source={require("./leaves.mp4")}
          //@ts-expect-error image type
          resizeMode="cover"
          style={[StyleSheet.absoluteFillObject, { opacity: 1 }]}
        />

        <View
          style={{
            padding: loginConstants.spacing,
            flex: 1,
            justifyContent: "flex-end",
            paddingBottom: height * 0.2,
          }}
        >
          <LoginLogo />
          <Text style={[styles.light, styles.heading]}>
            Awareness {"\n"}is the first step to growth
          </Text>
          <View
            style={{
              height: 2,
              width: width * 0.2,
              backgroundColor: "#fff",
              marginTop: loginConstants.spacing * 3,
            }}
          />
        </View>
        <Pressable onPress={showModal}>
          <View
            style={{
              paddingVertical: loginConstants.spacing,
              paddingBottom: loginConstants.spacing * 2,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Colours.dark.$,
              borderRadius: 32,
            }}
          >
            <AntDesign name="lock1" size={32} color={Colours.bright.$} />
          </View>
        </Pressable>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          keyboardBehavior="interactive"
          keyboardBlurBehavior="restore"
          snapPoints={snapPoints}
          handleComponent={() => {
            return (
              <Pressable onPress={hideModal}>
                <View
                  style={{
                    height: 64,
                    borderBottomWidth: 1,
                    borderBottomColor: Colours.bright.$,
                    backgroundColor: Colours.dark.$,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    size={36}
                    color={Colours.bright.$}
                    style={{ transform: [{ scaleX: 1.4 }], marginTop: 30 }}
                  />
                </View>
              </Pressable>
            );
          }}
        >
          <View
            style={{
              paddingHorizontal: loginConstants.spacing * 2,
              paddingVertical: loginConstants.spacing,
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <MotiText
              state={dynamicAnimation}
              style={[
                styles.regular,
                {
                  fontSize: 32,
                  color: Colours.dark.$,
                  marginBottom: loginConstants.spacing / 2,
                },
              ]}
            >
              Welcome
            </MotiText>
            <MotiView state={dynamicAnimation} delay={300}>
              <Formik
                initialValues={initialValues}
                onSubmit={async (values) => {
                  try {
                    await axios.post(`${baseUrl}/auth/register/`, values);
                    const completeOnboarding = async () => {
                      try {
                        await AsyncStorage.setItem("onboarding", "true");
                      } catch (e) {
                        return e;
                      }
                    };
                    completeOnboarding();
                    navigation.navigate("signIn");
                  } catch (err) {
                    return err;
                  }
                }}
                validate={validate}
                validateOnBlur={false}
                validateOnChange={false}
                validationSchema={validationSchema}
              >
                {({ handleSubmit, errors, ...formProps }) => (
                  <>
                    <TextField
                      context="register"
                      {...formProps}
                      autoCapitalize="none"
                      autoCorrect={false}
                      autoFocus
                      clearButtonMode="while-editing"
                      editable={!inProgress}
                      name={nameof<RegisterFormValues>("email")}
                      normaliser={[Normalisers.trim, Normalisers.lowercase]}
                      placeholder="Email Address"
                      returnKeyType="send"
                      style={[
                        styles.regular,
                        {
                          borderBottomWidth: 2,
                          borderBottomColor: "rgba(0,0,0,0.1)",
                          height: 64,
                          fontSize: 24,
                          marginBottom: loginConstants.spacing * 2,
                          paddingHorizontal: loginConstants.spacing / 2,
                        },
                      ]}
                      onSubmitEditing={() => handleSubmit()}
                      errorMessage={errors.email ?? undefined}
                    />
                    <TextField
                      context="register"
                      {...formProps}
                      autoCapitalize="none"
                      autoCorrect={false}
                      clearButtonMode="while-editing"
                      editable={!inProgress}
                      name={nameof<RegisterFormValues>("username")}
                      placeholder="Username"
                      returnKeyType="send"
                      style={[
                        styles.regular,
                        {
                          borderBottomWidth: 2,
                          borderBottomColor: "rgba(0,0,0,0.1)",
                          height: 64,
                          fontSize: 24,
                          marginBottom: loginConstants.spacing * 2,
                          paddingHorizontal: loginConstants.spacing / 2,
                        },
                      ]}
                      onSubmitEditing={() => handleSubmit()}
                      errorMessage={errors.username ?? undefined}
                    />
                    <TextField
                      context="register"
                      {...formProps}
                      autoCapitalize="none"
                      autoCorrect={false}
                      clearButtonMode="while-editing"
                      editable={!inProgress}
                      name={nameof<RegisterFormValues>("password")}
                      placeholder="Password"
                      returnKeyType="send"
                      style={[
                        styles.regular,
                        {
                          borderBottomWidth: 2,
                          borderBottomColor: "rgba(0,0,0,0.1)",
                          height: 64,
                          fontSize: 24,
                          marginBottom: loginConstants.spacing * 2,
                          paddingHorizontal: loginConstants.spacing / 2,
                        },
                      ]}
                      onSubmitEditing={() => handleSubmit()}
                      secureTextEntry
                      errorMessage={errors.password ?? undefined}
                    />
                    <TextField
                      context="register"
                      {...formProps}
                      autoCapitalize="none"
                      autoCorrect={false}
                      clearButtonMode="while-editing"
                      editable={!inProgress}
                      enablesReturnKeyAutomatically
                      name={nameof<RegisterFormValues>("password_confirmation")}
                      placeholder="Password Again"
                      returnKeyType="send"
                      style={[
                        styles.regular,
                        {
                          borderBottomWidth: 2,
                          borderBottomColor: "rgba(0,0,0,0.1)",
                          height: 64,
                          fontSize: 24,
                          marginBottom: loginConstants.spacing * 2,
                          paddingHorizontal: loginConstants.spacing / 2,
                        },
                      ]}
                      onSubmitEditing={() => handleSubmit()}
                      secureTextEntry
                      errorMessage={errors.password_confirmation ?? undefined}
                    />
                    {error ? <Text style={styles.error}>{error}</Text> : null}

                    <MotiView
                      state={dynamicAnimation}
                      delay={500}
                      style={{ justifyContent: "center" }}
                    >
                      <Pressable
                        style={{ marginBottom: loginConstants.spacing }}
                        onPress={() => handleSubmit()}
                      >
                        <View
                          style={{
                            backgroundColor: Colours.dark.$,
                            borderRadius: 16,
                            paddingVertical: loginConstants.spacing,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text
                            style={[
                              styles.bold,
                              { fontSize: 16, color: Colours.bright.$ },
                            ]}
                          >
                            Register
                          </Text>
                        </View>
                      </Pressable>
                      <View
                        style={{
                          alignItems: "center",
                          flexDirection: "row",
                          alignSelf: "center",
                        }}
                      >
                        <Pressable
                          onPress={() => navigation.navigate("signIn")}
                        >
                          <Text
                            style={[
                              styles.bold,
                              {
                                fontSize: 16,
                                color: "#053eff",
                                marginLeft: loginConstants.spacing / 2,
                              },
                            ]}
                          >
                            Have an account?
                          </Text>
                        </Pressable>
                      </View>
                    </MotiView>
                  </>
                )}
              </Formik>
            </MotiView>
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  light: {
    fontFamily: Fonts.OpenSans_400Regular,
  },
  regular: {
    fontFamily: Fonts.OpenSans_500Medium,
  },
  bold: {
    fontFamily: Fonts.OpenSans_700Bold,
  },
  heading: {
    fontSize: 46,
    color: "#fff",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colours.dark.$,
  },
  logo: {
    padding: loginConstants.spacing,
    backgroundColor: "#fff",
    position: "absolute",
    top: Constants.statusBarHeight,
    left: 0,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  error: {
    // marginVertical: 2,
    color: Colours.errorDark.$,
    fontFamily: Fonts.OpenSans_700Bold,
    fontSize: 16,
  },
});
