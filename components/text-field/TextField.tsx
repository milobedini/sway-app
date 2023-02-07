import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useFormikContext } from "formik";
import { forwardRef, useState } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

import { Colours } from "../../colours";
import { Fonts } from "../../fonts";
import { loginConstants } from "../../navigators/welcome/screens/sign-in/components/loginConstants";
import { Error } from "../error";
import { normalise } from "./normalise";
import { Normaliser } from "./Normaliser";

export type TextFieldProps = Omit<TextInputProps, "value"> & {
  errorMessage?: string;
  hideErrorMessage?: boolean;
  name: string;
  normaliser?: Normaliser | Normaliser[];
  context: string;
};

const styles = StyleSheet.create({
  errored: {
    borderColor: Colours.errorDark.$,
  },
  errorMessage: {
    marginHorizontal: 22,
    marginVertical: 4,
  },
  regular: {
    fontFamily: Fonts.OpenSans_500Medium,
  },
});

export const TextField = forwardRef<TextInput, TextFieldProps>(
  ({
    errorMessage,
    hideErrorMessage,
    name,
    normaliser = (v) => v,
    onBlur,
    onChangeText,
    onFocus,

    placeholder,
    context,
    ...rest
  }): JSX.Element => {
    // eslint-disable-next-line
    const [focussed, setFocussed] = useState(false);

    const { setFieldValue, values, errors, setFieldTouched } =
      useFormikContext<Record<string, string>>();

    const showError = (!!errors[name] || !errorMessage) && !hideErrorMessage;

    if (context === "signIn") {
      return (
        <>
          <BottomSheetTextInput
            {...rest}
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
            onFocus={(e) => {
              setFocussed(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocussed(false);
              onBlur?.(e);
              setFieldTouched(name);
            }}
            onChangeText={(e) => {
              onChangeText?.(e);
              setFieldValue(name, normalise(e, normaliser));
            }}
            placeholder={placeholder}
            placeholderTextColor="rgba(0,0,0,0.3)"
            value={values[name]}
          />
          {showError && (
            <Error style={styles.errorMessage}>
              {errorMessage ?? errors[name]}
            </Error>
          )}
        </>
      );
    }
    if (context === "register") {
      return (
        <>
          <BottomSheetTextInput
            {...rest}
            style={[
              styles.regular,
              {
                borderBottomWidth: 2,
                borderBottomColor: "rgba(0,0,0,0.1)",
                height: 36,
                fontSize: 20,
                marginBottom: loginConstants.spacing / 2,
                paddingHorizontal: loginConstants.spacing / 2,
              },
            ]}
            onFocus={(e) => {
              setFocussed(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocussed(false);
              onBlur?.(e);
              setFieldTouched(name);
            }}
            onChangeText={(e) => {
              onChangeText?.(e);
              setFieldValue(name, normalise(e, normaliser));
            }}
            placeholder={placeholder}
            placeholderTextColor="rgba(0,0,0,0.3)"
            value={values[name]}
          />
          {showError && (
            <Error style={styles.errorMessage}>
              {errorMessage ?? errors[name]}
            </Error>
          )}
        </>
      );
    }
    return <></>;
  }
);
