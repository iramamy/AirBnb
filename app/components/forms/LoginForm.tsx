import { useState, ComponentPropsWithRef } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field } from "formik";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { toast } from "react-toastify";

// Custom components
import LoginSchema from "./LoginValidation";
import apiService from "@/app/services/apiService";
import useSignUpModal from "@/app/hooks/useSignUpModal";
import { handleLogin } from "@/app/lib/actions";
import useForgotPasswordModal from "@/app/hooks/useForgotPasswordModal";

type LoginFormValues = {
  email: string;
  password: string;
};

type LoginFormProps = {
  close: () => void;
  props?: ComponentPropsWithRef<"input">;
};

const LoginForm = ({ close, props }: LoginFormProps) => {
  const router = useRouter();
  const [apiError, setApiError] = useState("");
  const [shownPassword, setShownPassword] = useState(false);

  const signUpModal = useSignUpModal();
  const forgotPasswordModal = useForgotPasswordModal();

  const initial_values = {
    email: "",
    password: "",
  };

  const submitForm = async (values: LoginFormValues) => {
    const formData = {
      email: values.email,
      password: values.password,
    };
    const login_url = "/api/auth/login/";

    const response = await apiService.postWithoutToken(
      login_url,
      JSON.stringify(formData)
    );

    if (response.access) {
      handleLogin(response.user.pk, response.access, response.refresh);
      toast.success("You are now logged in!");

      router.push("/");
      router.refresh();
      close(); // Close the modal
    } else if (response.non_field_errors) {
      setApiError(response.non_field_errors);
    }
  };

  const errorClass = "border-red-500";
  const noErrorClass = "border-gray-300";

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      {apiError && (
        <div className="text-red-500 text-center mt-0">
          Please enter valid credentials
        </div>
      )}
      <Formik
        initialValues={initial_values}
        validationSchema={LoginSchema}
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
                  errors.email || apiError ? errorClass : noErrorClass
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
              <div
                className={`border flex items-center in rounded-lg overflow-hidden focus-within:border-gray-900
                 ${errors.password ? errorClass : noErrorClass}`}
              >
                <Field
                  {...props}
                  type={shownPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border text-gray-900 rounded-s-lg block w-full p-2.5 focus:outline-none"
                ></Field>
                <button
                  onClick={() => setShownPassword(!shownPassword)}
                  className="p-2"
                  type="button"
                >
                  {shownPassword ? (
                    <EyeIcon className="w-5 h-5 text-gray-500" />
                  ) : (
                    <EyeSlashIcon className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
              {errors.password && (
                <small className="italic text-red-500">{errors.password}</small>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 text-blue-600"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="remember"
                    className="text-gray-500 dark:text-gray-450 hover:text-gray-600"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <span
                onClick={() => {
                  forgotPasswordModal.open();
                  close();
                }}
                className="text-sm font-medium text-primary-600 hover:underline cursor-pointer"
              >
                Forgot password?
              </span>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-airbnb font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-airbnb-dark "
            >
              Sign in
            </button>
            <p className="text-sm font-light text-gray-700 dark:text-gray-450">
              Don’t have an account yet?{" "}
              <span
                onClick={() => {
                  signUpModal.open();
                  close();
                }}
                className="font-medium text-airbnb hover:underline cursor-pointer"
              >
                Sign up
              </span>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
