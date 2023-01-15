import { FormikErrors } from "formik";

import { RegisterFormValues } from "./RegisterFormValues";

const validateWithApiRegex = (value: string) => {
  return value.match(/^\S[^@]{1,1024}@[^@]{1,1024}\.[^@]{1,1024}\S$/);
};

export const validate = ({
  email,
}: RegisterFormValues): FormikErrors<RegisterFormValues> => {
  if (!email.trim()) {
    return {
      email: "Email address is required",
    };
  }

  if (!validateWithApiRegex(email)) {
    return {
      email: "This doesn't look like a valid email address",
    };
  }

  return {};
};
