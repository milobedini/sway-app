import { StackScreenProps } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { MotiView, MotiText, useDynamicAnimation } from "moti";
import { useCallback, useMemo, useRef, useState } from "react";
import { Video } from "expo-av";
import { Formik } from "formik";
import axios from "axios";

import { Colours } from "../../../../colours";
import { WelcomeNavigatorParamsList } from "../../WelcomeNavigatorParamsList";
import { LoginLogo } from "./components/LoginLogo";
import { loginConstants } from "./components/loginConstants";
import { Fonts } from "../../../../fonts";
import { baseUrl } from "../../../../lib/api/api";
import { LoginFormValues } from "./components/LoginFormValues";
import { setToken, setUserId, setUsername } from "../../../../lib/auth/auth";
import { TextField } from "../../../../components/text-field";
import { nameof } from "../../components/name-of";

export type SignInScreenProps = StackScreenProps<
  WelcomeNavigatorParamsList,
  "signIn"
>;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colours.dark.$,
//   },
//   content: {
//     flex: 1,
//   },
//   background: { flex: 0.7, marginTop: 20 },
//   title: {
//     textAlign: "center",
//     color: Colours.lightGrey.$,
//   },
//   form: {
//     flexGrow: 1,
//   },
//   image: {
//     height: 500,
//     width: 800,
//     resizeMode: "contain",
//     alignSelf: "center",
//   },
// });

const { width, height } = Dimensions.get("screen");

interface ResponseError {
  response: {
    data: {
      detail: string;
    };
  };
}

interface userData {
  username: string;
  token: string;
  id: string;
}

export const SignInScreen = ({
  navigation,
}: SignInScreenProps): JSX.Element => {
  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };
  // eslint-disable-next-line
  const [inProgress, setInProgress] = useState(false);
  const [error, setError] = useState("");

  const bottomSheetModalRef = useRef(null);
  const dynamicAnimation = useDynamicAnimation(() => ({
    opacity: 0,
    translateY: 40,
  }));

  // variables
  const snapPoints = useMemo(() => ["70%"], []);

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

  const successfulSignIn = async (data: userData) => {
    try {
      setUsername(data.username);
      setToken(data.token);
      setUserId(data.id.toString());
    } catch (err) {
      return err;
    }
  };

  return (
    <BottomSheetModalProvider>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <Video
          shouldPlay
          isLooping
          source={require("./waves.mp4")}
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
            Awaken {"\n"}to your true self
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
                    style={{
                      transform: [{ scaleX: 1.4 }],
                      marginTop: 30,
                    }}
                  />
                </View>
              </Pressable>
            );
          }}
        >
          <View
            style={{
              paddingHorizontal: loginConstants.spacing * 2,
              paddingVertical: loginConstants.spacing * 2,
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
                  marginBottom: loginConstants.spacing * 2,
                },
              ]}
              onPress={() =>
                navigation
                  .getParent()
                  ?.navigate("main", { screen: "home", params: {} })
              }
            >
              Welcome Back
            </MotiText>
            <MotiView state={dynamicAnimation} delay={300}>
              <Formik
                initialValues={initialValues}
                onSubmit={async (values) => {
                  try {
                    const res = await axios.post(
                      `${baseUrl}/auth/login/`,
                      values
                    );
                    successfulSignIn(res.data);
                    navigation
                      .getParent()
                      ?.navigate("main", { screen: "home", params: {} });
                  } catch (err) {
                    setError((err as ResponseError).response.data.detail);
                  }
                }}
                validateOnBlur={false}
                validateOnChange={false}
              >
                {({ handleSubmit, ...formProps }) => (
                  <>
                    <TextField
                      context="signIn"
                      {...formProps}
                      autoCapitalize="none"
                      autoCorrect={false}
                      autoFocus
                      clearButtonMode="while-editing"
                      editable={!inProgress}
                      name={nameof<LoginFormValues>("email")}
                      placeholder="Email Address"
                      returnKeyType="send"
                      onSubmitEditing={() => handleSubmit()}
                      errorMessage={error ?? undefined}
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
                    />

                    <TextField
                      context="signIn"
                      {...formProps}
                      autoCapitalize="none"
                      autoCorrect={false}
                      clearButtonMode="while-editing"
                      editable={!inProgress}
                      enablesReturnKeyAutomatically
                      name={nameof<LoginFormValues>("password")}
                      placeholder="Password"
                      returnKeyType="send"
                      onSubmitEditing={() => handleSubmit()}
                      secureTextEntry
                      errorMessage={error ?? undefined}
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
                            Sign in
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
                          onPress={() => navigation.navigate("register")}
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
                            Need an account?
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
    marginVertical: 2,
    color: Colours.errorDark.$,
    fontFamily: Fonts.OpenSans_700Bold,
    fontSize: 16,
  },
});
