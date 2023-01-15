import {
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewProps,
} from "react-native";
import { Formik } from "formik";
import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Colours } from "../../../../../../colours";
import { validate } from "./validate";
import {
  Normalisers,
  TextField,
} from "../../../../../../components/text-field";
import { nameof } from "../../../../components/name-of";
import { RegisterFormValues } from "./RegisterFormValues";
import logo from "../../../../../../assets/logo_black.png";
import { baseUrl } from "../../../../../../lib/api/api";

const styles = StyleSheet.create({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  background: {
    height: "80%",
    flex: 1,
  },
  title: {
    color: Colours.dark.$,
    textAlign: "center",
  },
  body: { textAlign: "center", color: Colours.dark.$, marginVertical: 0 },
  fields: {
    display: "flex",
    paddingVertical: 0,
    alignItems: "center",
  },
  field: {
    marginVertical: 8,
  },
  error: {
    paddingHorizontal: 20,
  },
});

export type RegisterFormProps = Omit<ViewProps, "children"> & {
  onSuccess(emailAddress: string): void;
};

export const RegisterForm = ({
  onSuccess,
  style,
  ...rest
}: RegisterFormProps): JSX.Element => {
  const initialValues: RegisterFormValues = {
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
  };

  // eslint-disable-next-line
  const [inProgress, setInProgress] = useState(false);

  const error = () => {
    return "There was a problem registering you";
  };

  const { width } = useWindowDimensions();

  return (
    <View style={[style, styles.root]} {...rest}>
      <ImageBackground
        style={[styles.background, { width: width }]}
        source={logo}
      >
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
              onSuccess(values.email);
            } catch (err) {
              return err;
            }
          }}
          validate={validate}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ handleSubmit, ...formProps }) => (
            <>
              <View style={styles.fields}>
                {/* <Text style={[textStyles.body, styles.body]}></Text> */}
                <TextField
                  {...formProps}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoFocus
                  clearButtonMode="while-editing"
                  editable={!inProgress}
                  enablesReturnKeyAutomatically
                  name={nameof<RegisterFormValues>("email")}
                  normaliser={[Normalisers.trim, Normalisers.lowercase]}
                  placeholder="Email Address"
                  returnKeyType="send"
                  style={[styles.field, { width: width - 50 }]}
                  onSubmitEditing={() => handleSubmit()}
                  errorMessage={error() ?? undefined}
                />
                {/* <Text style={[textStyles.body, styles.body]}></Text> */}
                <TextField
                  {...formProps}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoFocus
                  clearButtonMode="while-editing"
                  editable={!inProgress}
                  enablesReturnKeyAutomatically
                  name={nameof<RegisterFormValues>("username")}
                  normaliser={[Normalisers.trim, Normalisers.lowercase]}
                  placeholder="Username"
                  returnKeyType="send"
                  style={[styles.field, { width: width - 50 }]}
                  onSubmitEditing={() => handleSubmit()}
                  errorMessage={error() ?? undefined}
                />
                <TextField
                  {...formProps}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoFocus
                  clearButtonMode="while-editing"
                  editable={!inProgress}
                  enablesReturnKeyAutomatically
                  name={nameof<RegisterFormValues>("password")}
                  normaliser={[Normalisers.trim, Normalisers.lowercase]}
                  placeholder="Password"
                  returnKeyType="send"
                  style={[styles.field, { width: width - 50 }]}
                  onSubmitEditing={() => handleSubmit()}
                  errorMessage={error() ?? undefined}
                />
                <TextField
                  {...formProps}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoFocus
                  clearButtonMode="while-editing"
                  editable={!inProgress}
                  enablesReturnKeyAutomatically
                  name={nameof<RegisterFormValues>("password_confirmation")}
                  normaliser={[Normalisers.trim, Normalisers.lowercase]}
                  placeholder="Password Again"
                  returnKeyType="send"
                  style={[styles.field, { width: width - 50 }]}
                  onSubmitEditing={() => handleSubmit()}
                  errorMessage={error() ?? undefined}
                />
              </View>
            </>
          )}
        </Formik>
      </ImageBackground>
    </View>
  );
};
