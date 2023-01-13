import { LoginFormValues } from './LoginFormValues'
import { FormikErrors } from 'formik'

const validateWithApiRegex = (value: string) => {
  return value.match(/^\S[^@]{1,1024}@[^@]{1,1024}\.[^@]{1,1024}\S$/)
}

export const validate = ({
  emailAddress,
}: LoginFormValues): FormikErrors<LoginFormValues> => {
  if (!emailAddress.trim()) {
    return {
      emailAddress: 'Email address is required',
    }
  }

  if (!validateWithApiRegex(emailAddress)) {
    return {
      emailAddress: "This doesn't look like a valid email address",
    }
  }

  return {}
}
