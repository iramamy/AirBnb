import * as yup from "yup";

const EditProfileSchema = (emailList: string[], nameList: string[]) => {
  const normalizedNames = nameList.map((name) => name.trim().toLowerCase());

  return yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email")
      .notOneOf(emailList, "This email is already in use"),
    name: yup
      .string()
      .test(
        "non-empty-characters",
        "Name must be at least 5 characters",
        (value) => !!value && value.replace(/\s/g, "").length >= 5
      )
      .required("Name is required")
      .test(
        "unique-name",
        "This username is already in use",
        (value) => !normalizedNames.includes(value?.trim().toLowerCase() || "")
      ),
  });
};

export default EditProfileSchema;
