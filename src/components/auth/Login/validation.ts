import * as Yup from "yup";

export const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Incorect email")
    .required("Input email"),

  password: Yup.string()
      .required('Input password')
      .min(6, 'Password min 6 symbols'),
});
