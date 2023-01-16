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
import * as yup from "yup";

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
    justifyContent: "flex-start",
    marginTop: 20,
  },
  background: {
    flex: 0.7,
  },
  title: {
    color: Colours.dark.$,
    textAlign: "center",
  },
  body: { textAlign: "center", color: Colours.dark.$, marginVertical: 0 },
  fields: {
    display: "flex",
    alignItems: "center",
  },
  field: {
    marginVertical: 2,
  },
  error: {
    marginHorizontal: 2,
  },
});

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
          validationSchema={validationSchema}
        >
          {({ handleSubmit, errors, ...formProps }) => (
            <>
              <View style={styles.fields}>
                <TextField
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
                  style={[styles.field, { width: width - 50 }]}
                  onSubmitEditing={() => handleSubmit()}
                  errorMessage={errors.email ?? undefined}
                />
                <TextField
                  {...formProps}
                  autoCapitalize="none"
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  editable={!inProgress}
                  name={nameof<RegisterFormValues>("username")}
                  normaliser={[Normalisers.trim, Normalisers.lowercase]}
                  placeholder="Username"
                  returnKeyType="send"
                  style={[styles.field, { width: width - 50 }]}
                  onSubmitEditing={() => handleSubmit()}
                  errorMessage={errors.username ?? undefined}
                />
                <TextField
                  {...formProps}
                  autoCapitalize="none"
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  editable={!inProgress}
                  name={nameof<RegisterFormValues>("password")}
                  placeholder="Password"
                  returnKeyType="send"
                  style={[styles.field, { width: width - 50 }]}
                  onSubmitEditing={() => handleSubmit()}
                  secureTextEntry
                  errorMessage={errors.password ?? undefined}
                />
                <TextField
                  {...formProps}
                  autoCapitalize="none"
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  editable={!inProgress}
                  enablesReturnKeyAutomatically
                  name={nameof<RegisterFormValues>("password_confirmation")}
                  placeholder="Password Again"
                  returnKeyType="send"
                  style={[styles.field, { width: width - 50 }]}
                  onSubmitEditing={() => handleSubmit()}
                  secureTextEntry
                  errorMessage={errors.password_confirmation ?? undefined}
                />
              </View>
            </>
          )}
        </Formik>
      </ImageBackground>
    </View>
  );
};
