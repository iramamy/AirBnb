import * as yup from "yup";

const EditPropertySchema = () => {
  return yup.object().shape({
    country: yup.string().required("Please select a place"),
    category: yup.string().required("Please choose a category"),
    title: yup.string().required("Please provide a title"),
    description: yup.string().required("Please write a description"),
    price_per_night: yup
      .number()
      .typeError("Price must be a number")
      .integer("Price must be an integer")
      .required("Please provide a price")
      .positive("Price per night must be a positive number"),
    bedrooms: yup
      .number()
      .typeError("Number of bedrooms must be a number")
      .integer("Number of bedrooms must be an integer")
      .required("Please provide the number of bedrooms"),
    guests: yup
      .number()
      .typeError("Number of guests must be a number")
      .required("Please provide the number of allowed guests")
      .integer("Number of guests must be an integer")
      .positive("Number of guests must be a positive number"),
  });
};

export default EditPropertySchema;
