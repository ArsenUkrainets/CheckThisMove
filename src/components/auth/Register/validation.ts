import * as Yup from "yup";

export const RegisterSchema = Yup.object({

    name: Yup.string()
        .required("Enter your name"),

    email: Yup.string()
        .email("Incorect email")
        .required("Input email"),

    password: Yup.string()
        .required('Input password')
        .min(6, 'Password min 6 symbols')
        .matches(/[a-zA-Z]/, 'Passwrod must have latin letters'),
    password_confirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords does not match')
        .required('Confirm Password is required'),
});