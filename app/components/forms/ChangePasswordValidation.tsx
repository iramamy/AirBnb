import * as yup from "yup";

const ChangePasswordSchema = () => {
  return yup.object().shape({
    oldPassword: yup
      .string()
      .min(5)
      .required("Password should be at lest 5 character"),
    password: yup
      .string()
      .min(5)
      .required("Password should be at lest 5 character"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Password does not match")
      .required("Required"),
  });
};

export default ChangePasswordSchema;
