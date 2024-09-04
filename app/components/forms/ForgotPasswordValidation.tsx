import * as yup from "yup";

const ForgotPasswordSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
});

export default ForgotPasswordSchema;
