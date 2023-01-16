import {
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewProps,
} from "react-native";
import { Formik } from "formik";
import { useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

import { Colours } from "../../../../../../colours";
import { LoginFormValues } from "./LoginFormValues";
import { TextField } from "../../../../../../components/text-field";
import { nameof } from "../../../../components/name-of";
import { baseUrl } from "../../../../../../lib/api/api";
import {
  setToken,
  setUserId,
  setUsername,
} from "../../../../../../lib/auth/auth";
import { Fonts } from "../../../../../../fonts";

const styles = StyleSheet.create({
  root: {
    display: "flex",
    marginVertical: 20,
  },
  title: {
    color: Colours.dark.$,
    textAlign: "center",
  },
  fields: {
    display: "flex",
    paddingVertical: 0,
    alignItems: "center",
  },
  field: {
    marginVertical: 2,
  },
  fieldError: {
    marginVertical: 20,
  },
  error: {
    marginVertical: 2,
    color: Colours.errorDark.$,
    fontFamily: Fonts.OpenSans_700Bold,
    fontSize: 16,
  },
});

export type LoginFormProps = Omit<ViewProps, "children"> & {
  // onFinish: void;
};

interface ResponseError {
  response: {
    data: {
      detail: string;
    };
  };
}

export const LoginForm = ({ style, ...rest }: LoginFormProps): JSX.Element => {
  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  // eslint-disable-next-line
  const [inProgress, setInProgress] = useState(false);
  const [error, setError] = useState("");

  const { width } = useWindowDimensions();

  interface userData {
    username: string;
    token: string;
    id: string;
  }

  const successfulSignIn = async (data: userData) => {
    try {
      setUsername(data.username);
      setToken(data.token);
      setUserId(data.id.toString());
    } catch (err) {
      return err;
    }
  };

  const navigation = useNavigation();

  return (
    <View style={[style, styles.root]} {...rest}>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          try {
            const res = await axios.post(`${baseUrl}/auth/login/`, values);
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
            <View style={styles.fields}>
              <TextField
                {...formProps}
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus
                clearButtonMode="while-editing"
                editable={!inProgress}
                name={nameof<LoginFormValues>("email")}
                placeholder="Email Address"
                returnKeyType="send"
                style={[styles.field, { width: width - 50 }]}
                onSubmitEditing={() => handleSubmit()}
                errorMessage={error ?? undefined}
              />
              <TextField
                {...formProps}
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                editable={!inProgress}
                enablesReturnKeyAutomatically
                name={nameof<LoginFormValues>("password")}
                placeholder="Password"
                returnKeyType="send"
                style={[
                  styles.field,
                  { width: width - 50 },
                  error ? styles.fieldError : null,
                ]}
                onSubmitEditing={() => handleSubmit()}
                secureTextEntry
                errorMessage={error ?? undefined}
              />
              {error ? <Text style={styles.error}>{error}</Text> : null}
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};
