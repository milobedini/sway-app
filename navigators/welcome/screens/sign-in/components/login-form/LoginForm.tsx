import {
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewProps,
} from "react-native";
import { Colours } from "../../../../../../colours";
import { textStyles } from "../../../../../../components/text";
import { Formik } from "formik";
import { validate } from "./validate";
import { LoginFormValues } from "./LoginFormValues";
import {
  Normalisers,
  TextField,
} from "../../../../../../components/text-field";
import { nameof } from "../../../../components/name-of";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../../../../lib/api/api";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { HomeNavigatorParamsList } from "../../../../../home/HomeNavigatorParamsList";

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
    marginVertical: 36,
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

  const [inProgress, setInProgress] = useState(false);

  const error = () => {
    return "There was a problem signing you in";
  };

  const { width } = useWindowDimensions();

  const toHome = () => {
    console.log("CONTINUE");
  };

  const navigation = useNavigation();

  return (
    <View style={[style, styles.root]} {...rest}>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          console.log(values);
          try {
            const res = await axios.post(`${baseUrl}/auth/login/`, values);
            console.log(
              `Succesfully logged in as ${res.data.username} with token ${res.data.token} and id ${res.data.id}`
            );
            navigation
              .getParent()
              ?.navigate("main", { screen: "home", params: {} });
          } catch (err) {
            console.log(err);
          }
        }}
        // validate={validate}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ handleSubmit, values, ...formProps }) => (
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
                style={(styles.field, { width: width - 50 })}
                onSubmitEditing={() => handleSubmit()}
                // errorMessage={error() ?? undefined}
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
                style={(styles.field, { width: width - 50 })}
                onSubmitEditing={() => handleSubmit()}
                // errorMessage={error() ?? undefined}
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};
