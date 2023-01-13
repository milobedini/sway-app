import { useFormikContext } from 'formik'
import { forwardRef, useState } from 'react'
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'
import { Colours } from '../../colours'
import { Fonts } from '../../fonts'
import { Error } from '../error'
import { useForwardRef } from '../use-forward-ref'
import { normalise } from './normalise'
import { Normaliser } from './Normaliser'

export type TextFieldProps = Omit<TextInputProps, 'value'> & {
  errorMessage?: string
  hideErrorMessage?: boolean
  name: string
  normaliser?: Normaliser | Normaliser[]
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colours.dark.$,
    borderColor: Colours.bright.$,
    borderRadius: 15,
    borderStyle: 'solid',
    borderWidth: 2,
    color: Colours.bright.$,
    fontFamily: Fonts.OpenSans_700Bold,
    fontSize: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  inputWithTitle: {
    paddingTop: 24,
    paddingBottom: 8,
  },
  title: {
    color: Colours.bright.$,
    fontFamily: Fonts.OpenSans_700Bold,
    fontSize: 12,
    left: 24,
    position: 'absolute',
    top: 9,
  },
  focussed: {
    borderColor: Colours.bright.$,
  },
  errored: {
    borderColor: Colours.errorDark.$,
  },
  errorMessage: {
    marginHorizontal: 22,
    marginVertical: 4,
  },
})

export const TextField = forwardRef<TextInput, TextFieldProps>(
  (
    {
      errorMessage,
      hideErrorMessage,
      name,
      normaliser = (v) => v,
      onBlur,
      onChangeText,
      onFocus,
      style,
      placeholder,
      ...rest
    },
    parentRef
  ): JSX.Element => {
    const [focussed, setFocussed] = useState(false)

    const { setFieldValue, values, errors, setFieldTouched } =
      useFormikContext<Record<string, string>>()

    const internalRef = useForwardRef(parentRef)
    const showTitle = !!values[name]
    const showError = (!!errors[name] || !errorMessage) && !hideErrorMessage

    return (
      <View style={style}>
        <TextInput
          {...rest}
          style={[
            styles.input,
            focussed && styles.focussed,
            showError && styles.errored,
            showTitle && styles.inputWithTitle,
          ]}
          onFocus={(e) => {
            setFocussed(true)
            onFocus?.(e)
          }}
          onBlur={(e) => {
            setFocussed(false)
            onBlur?.(e)
            setFieldTouched(name)
          }}
          onChangeText={(e) => {
            onChangeText?.(e)
            setFieldValue(name, normalise(e, normaliser))
          }}
          placeholder={placeholder}
          placeholderTextColor={Colours.bright.$}
          ref={internalRef}
          value={values[name]}
        />
        {showTitle && <Text style={styles.title}>{placeholder}</Text>}
        {showError && (
          <Error style={styles.errorMessage}>
            {errorMessage ?? errors[name]}
          </Error>
        )}
      </View>
    )
  }
)
