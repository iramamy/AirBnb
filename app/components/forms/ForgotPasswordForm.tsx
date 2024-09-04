"use client";
import { Formik, Form, Field } from "formik";

// Custom components
import ForgotPasswordSchema from "./ForgotPasswordValidation";
type ForgotPasswordFormValues = {
  email: string;
};

const ForgotPasswordForm = () => {
  const initialValues = {
    email: "",
  };

  const submitForm = async (values: ForgotPasswordFormValues) => {
    console.log(values);
  };

  const errorClass = "border-red-500";
  const noErrorClass = "border-gray-300";

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <Formik
        initialValues={initialValues}
        validationSchema={ForgotPasswordSchema}
        onSubmit={submitForm}
      >
        {({ errors }) => (
          <Form className="space-y-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your email
            </label>
            <Field
              type="email"
              name="email"
              className={`bg-gray-50 border ${
                errors.email ? errorClass : noErrorClass
              } text-gray-900 rounded-lg block w-full p-2.5 focus:border-gray-900 focus:outline-none`}
              placeholder="Type your email ..."
            ></Field>
            {errors.email && (
              <small className="italic text-red-500">{errors.email}</small>
            )}
            <button
              type="button"
              className="w-full text-white bg-airbnb font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-airbnb-dark "
            >
              Reset password
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPasswordForm;
