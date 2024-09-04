"use client";

import { Formik, Field, Form } from "formik";
import { useRouter } from "next/navigation";
import { useState, ComponentPropsWithRef } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { toast } from "react-toastify";

// Custom components
import CustomButton from "./CustomButton";
import BackArrow from "../BackArrow";
import apiService from "@/app/services/apiService";
import ChangePasswordSchema from "./ChangePasswordValidation";
import useLoginModal from "@/app/hooks/useLoginModal";
import { resetAuthCookies } from "@/app/lib/actions";

type ChangePasswordFormValues = {
  oldPassword: string;
  password: string;
  confirmPassword: string;
};

type ChangePasswordProps = {
  props: ComponentPropsWithRef<"input">;
};

const ChangePasswordForm = ({ props }: ChangePasswordProps) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const [apiError, setApiError] = useState(false);
  const [shownOldPassword, setShownOldPassword] = useState(false);
  const [shownPassword, setShownPassword] = useState(false);
  const [shownConfirmPassword, setShownConfirmPassword] = useState(false);

  const initialValues = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
  };

  const submitForm = async (values: ChangePasswordFormValues) => {
    if (values.oldPassword && values.password && values.confirmPassword) {
      const formData = new FormData();
      formData.append("oldPassword", values.oldPassword);
      formData.append("password", values.password);
      formData.append("confirmPassword", values.confirmPassword);

      const response = await apiService.post(
        "/api/auth/changepassword/",
        formData
      );

      if (response.success) {
        resetAuthCookies();
        toast.success("Password changed successfully!");

        router.push("/");
        loginModal.open();
      } else {
        setApiError(true);
      }
    }
  };

  const errorClass = "border-red-500";
  const noErrorClass = "border-gray-300";

  return (
    <div className="shadow-md mt-10 pt-8 lg:max-w-[50%] md:max-w-[60%] sm:max-w-[95%] mx-auto p-4 relative border border-gray">
      <div className="absolute top-25 left-15">
        <BackArrow />
      </div>
      <h2 className="mb-6 text-3xl text-center text-airbnb">Change password</h2>

      {apiError && (
        <div className="text-red-500 text-center mt-0">
          Please enter valid credential
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={ChangePasswordSchema}
        onSubmit={submitForm}
      >
        {({ errors, handleChange }) => (
          <Form>
            <div className="pt-3 pb-6 space-y-4">
              <div className="flex flex-col space-y-2">
                <label>Old password</label>
                <div
                  className={`border flex items-center in rounded-lg overflow-hidden focus-within:border-gray-900
                 ${errors.oldPassword ? errorClass : noErrorClass}`}
                >
                  <Field
                    {...props}
                    type={shownOldPassword ? "text" : "password"}
                    name="oldPassword"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      setApiError(false);
                    }}
                    className="bg-gray-50 border text-gray-900 rounded-s-lg block w-full p-2.5 focus:outline-none"
                    placeholder="Old password here ..."
                  ></Field>
                  <button
                    onClick={() => setShownOldPassword(!shownOldPassword)}
                    className="p-2 "
                    type="button"
                  >
                    {shownOldPassword ? (
                      <EyeIcon className="w-5 h-5 text-gray-500" />
                    ) : (
                      <EyeSlashIcon className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                </div>
                {errors.oldPassword && (
                  <small className="italic text-red-500">
                    {errors.oldPassword}
                  </small>
                )}
              </div>

              <div className="flex flex-col space-y-2">
                <label>New password</label>
                <div
                  className={`border flex items-center in rounded-lg overflow-hidden focus-within:border-gray-900
                 ${errors.password ? errorClass : noErrorClass}`}
                >
                  <Field
                    {...props}
                    type={shownPassword ? "text" : "password"}
                    name="password"
                    className="bg-gray-50 border text-gray-900 rounded-s-lg block w-full p-2.5 focus:outline-none"
                    placeholder="New password here ..."
                  ></Field>
                  <button
                    onClick={() => setShownPassword(!shownPassword)}
                    className="p-2 "
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
                  <small className="italic text-red-500">
                    {errors.password}
                  </small>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <label>Confirm password</label>
                <div
                  className={`border flex items-center in rounded-lg overflow-hidden focus-within:border-gray-900
                 ${errors.confirmPassword ? errorClass : noErrorClass}`}
                >
                  <Field
                    {...props}
                    type={shownConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    className="bg-gray-50 border text-gray-900 rounded-s-lg block w-full p-2.5 focus:outline-none"
                    placeholder="Confirm password here ..."
                  ></Field>
                  <button
                    onClick={() =>
                      setShownConfirmPassword(!shownConfirmPassword)
                    }
                    className="p-2"
                    type="button"
                  >
                    {shownConfirmPassword ? (
                      <EyeIcon className="w-5 h-5 text-gray-500" />
                    ) : (
                      <EyeSlashIcon className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <small className="italic text-red-500">
                    {errors.confirmPassword}
                  </small>
                )}
              </div>
            </div>

            <CustomButton label="Save change" isEdit={true} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePasswordForm;
