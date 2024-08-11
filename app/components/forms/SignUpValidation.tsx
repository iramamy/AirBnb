import * as yup from "yup";

const signUpSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup
    .string()
    .min(5)
    .required("Password should be at lest 5 character"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Password does not match")
    .required("Required"),
  terms_n_condition: yup
    .bool()
    .oneOf([true], "You should accept our terms and conditions"),
});

export default signUpSchema;
