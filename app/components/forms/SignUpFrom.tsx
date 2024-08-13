import { Formik, Form, Field } from "formik";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// Custom components
import signUpSchema from "./SignUpValidation";
import apiService from "@/app/services/apiService";
import useLoginModal from "@/app/hooks/useLoginModal";
import { handleLogin } from "@/app/lib/actions";

type SignUpFormValues = {
  email: string;
  password: string;
  confirm_password: string;
  terms_n_condition: boolean;
};

type SignUpFormProps = {
  close: () => void;
};

const SignUpFrom = ({ close }: SignUpFormProps) => {
  const router = useRouter();
  const [emailList, setEmailList] = useState<string[]>([]);

  const loginModal = useLoginModal();

  // Fetch email list from db
  useEffect(() => {
    const fetchEmails = async () => {
      const url = "/api/auth/useremail";
      const response = await apiService.get(url);
      setEmailList(
        response.data.map((email: { email: string }) => email.email)
      );
    };

    fetchEmails();
  }, []);

  const initial_values = {
    email: "",
    password: "",
    confirm_password: "",
    terms_n_condition: false,
  };

  // sign up form submission
  const submitForm = async (values: SignUpFormValues) => {
    const formData = {
      email: values.email,
      password1: values.password,
      password2: values.confirm_password,
    };

    const registration_url = "/api/auth/register/";

    const response = await apiService.post(
      registration_url,
      JSON.stringify(formData)
    );

    if (response.access) {
      handleLogin(response.user.pk, response.access, response.refresh);
      router.push("/");
      close(); // Close the modal
    }
  };

  const errorClass = "border-red-500";
  const noErrorClass = "border-gray-300";

  return (
    <div className="p-2 space-y-4 md:space-y-6 sm:p-8">
      <Formik
        initialValues={initial_values}
        validationSchema={signUpSchema(emailList)}
        onSubmit={submitForm}
      >
        {({ errors }) => (
          <Form className="space-y-4 md:space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                className={`bg-gray-50 border ${
                  errors.email ? errorClass : noErrorClass
                } text-gray-900 rounded-lg block w-full p-2.5 focus:border-gray-900 focus:outline-none`}
                placeholder="name@company.com"
              ></Field>
              {errors.email && (
                <small className="italic text-red-500">{errors.email}</small>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <Field
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className={`bg-gray-50 border ${
                  errors.password ? errorClass : noErrorClass
                } text-gray-900 rounded-lg block w-full p-2.5 focus:border-gray-900 focus:outline-none`}
              ></Field>
              {errors.password && (
                <small className="italic text-red-500">{errors.password}</small>
              )}
            </div>
            <div>
              <label
                htmlFor="confirm_password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Confirm password
              </label>
              <Field
                type="password"
                name="confirm_password"
                id="confirm_password"
                placeholder="••••••••"
                className={`bg-gray-50 border ${
                  errors.confirm_password ? errorClass : noErrorClass
                } text-gray-900 rounded-lg block w-full p-2.5 focus:border-gray-900 focus:outline-none`}
              ></Field>
              {errors.confirm_password && (
                <small className="italic text-red-500">
                  {errors.confirm_password}
                </small>
              )}
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <Field
                  id="terms"
                  name="terms_n_condition"
                  aria-describedby="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                ></Field>
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="terms_n_condition"
                  className="font-light text-gray-500 dark:text-gray-450"
                >
                  I accept the{" "}
                  <a
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    href="#"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>
            {errors.terms_n_condition && (
              <small className="italic text-red-500">
                {errors.terms_n_condition}
              </small>
            )}
            <button
              type="submit"
              className="w-full text-white bg-airbnb font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-airbnb-dark "
            >
              Create
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-450">
              Already have an account?{" "}
              <span
                onClick={() => {
                  loginModal.open();
                  close();
                }}
                className="font-medium text-airbnb hover:underline hover:text-airbnb-dark   dark:text-primary-500 cursor-pointer"
              >
                Login here
              </span>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpFrom;
