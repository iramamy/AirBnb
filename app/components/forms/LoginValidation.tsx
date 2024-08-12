import * as yup from "yup";

const LoginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup
    .string()
    .min(5)
    .required("Password should be at lest 5 character"),
});

export default LoginSchema;
