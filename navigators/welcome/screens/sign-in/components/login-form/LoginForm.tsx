import { StyleSheet, useWindowDimensions, View, ViewProps } from "react-native";
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

const styles = StyleSheet.create({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginVertical: 20,
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

export type LoginFormProps = Omit<ViewProps, "children"> & {
  // onFinish: void;
};

export const LoginForm = ({ style, ...rest }: LoginFormProps): JSX.Element => {
  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  // eslint-disable-next-line
  const [inProgress, setInProgress] = useState(false);

  const error = () => {
    return "There was a problem signing you in";
  };

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
            return err;
          }
        }}
        // validate={validate}
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
                name={nameof<LoginFormValues>("email")}
                // normaliser={[Normalisers.trim, Normalisers.lowercase]}
                placeholder="Email Address"
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
                name={nameof<LoginFormValues>("password")}
                // normaliser={[Normalisers.trim, Normalisers.lowercase]}
                placeholder="Password"
                returnKeyType="send"
                style={[styles.field, { width: width - 50 }]}
                onSubmitEditing={() => handleSubmit()}
                errorMessage={error() ?? undefined}
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};
