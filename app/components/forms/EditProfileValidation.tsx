import * as yup from "yup";

const EditProfileSchema = (emailList: string[], nameList: string[]) => {
  return yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email")
      .notOneOf(emailList, "Email already in use"),
    name: yup
      .string()
      .min(5)
      .required("Name is required")
      .notOneOf(nameList, "Name already in use"),
  });
};

export default EditProfileSchema;
