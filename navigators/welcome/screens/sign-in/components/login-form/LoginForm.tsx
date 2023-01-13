import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewProps,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colours } from '../../../../../../colours'
import { textStyles } from '../../../../../../components/text'
import imageSource from '../../../../../../assets/logo_black.png'
import { Formik } from 'formik'
import { validate } from './validate'
import { LoginFormValues } from './LoginFormValues'
import { Normalisers, TextField } from '../../../../../../components/text-field'
import { nameof } from '../../../../components/name-of'
import { useState } from 'react'

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  title: {
    color: Colours.dark.$,
    textAlign: 'center',
  },
  body: { textAlign: 'center', color: Colours.dark.$, marginVertical: 0 },
  fields: {
    display: 'flex',
    paddingVertical: 0,
    alignItems: 'center',
  },
  field: {
    marginVertical: 36,
  },
  error: {
    paddingHorizontal: 20,
  },
})

export type LoginFormProps = Omit<ViewProps, 'children'> & {
  onSuccess(emailAddress: string): void
}

export const LoginForm = ({
  onSuccess,
  style,
  ...rest
}: LoginFormProps): JSX.Element => {
  const initialValues: LoginFormValues = {
    emailAddress: '',
  }

  const [inProgress, setInProgress] = useState(false)

  const error = () => {
    return 'There was a problem signing you in'
  }

  const { width } = useWindowDimensions()

  return (
    <View style={[style, styles.root]} {...rest}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => console.log(values)}
        validate={validate}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ handleSubmit, ...formProps }) => (
          <>
            <View style={styles.fields}>
              <Text style={[textStyles.body, styles.body]}></Text>
              <TextField
                {...formProps}
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus
                clearButtonMode="while-editing"
                editable={!inProgress}
                enablesReturnKeyAutomatically
                name={nameof<LoginFormValues>('emailAddress')}
                normaliser={[Normalisers.trim, Normalisers.lowercase]}
                placeholder="Email Address"
                returnKeyType="send"
                style={(styles.field, { width: width - 50 })}
                onSubmitEditing={() => handleSubmit()}
                errorMessage={error() ?? undefined}
              />
            </View>
          </>
        )}
      </Formik>
      {/* </SafeAreaView> */}
    </View>
    // </View>
  )
}
