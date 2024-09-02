"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/navigation";

// Custom components
import CustomButton from "./CustomButton";
import BackArrow from "../BackArrow";
import EditProfileSchema from "./EditProfileValidation";
import apiService from "@/app/services/apiService";

type EditProfileFormValues = {
  email: string;
  name: string;
  avatar_url: string;
};

interface EditProfileFormProps {
  userData: {
    id: string;
    email: string;
    name: string;
    avatar_url: string;
  };
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ userData }) => {
  // console.log(userData);

  const [emailList, setEmailList] = useState<string[]>([]);
  const [nameList, setNameList] = useState<string[]>([]);
  const [avatarUrl, setAvatarUrl] = useState<string>(userData.avatar_url);
  const [userImage, setUserImage] = useState<File | null>(null);
  const [apiError, setApiError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const url = "/api/auth/user_list";
      const response = await apiService.get(url);
      const emails = response.data.map((user: { email: string }) => user.email);
      const names = response.data.map((user: { name: string }) => user.name);

      // Filter out the current user's email and name
      const filteredEmails = emails.filter(
        (email: string) => email !== userData.email
      );
      const filteredNames = names.filter(
        (name: string) => name !== userData.name
      );

      setEmailList(filteredEmails);
      setNameList(filteredNames);
    };

    fetchUserData();
  }, []);

  const initialValues = {
    email: userData.email,
    name: userData.name,
    avatar_url: userData.avatar_url,
  };

  const submitForm = async (values: EditProfileFormValues) => {
    // console.log(values);

    // formData.append("avatar_url", userImage);
    if (userImage && values.email && values.name) {
      const formData = new FormData();
      formData.append("user_id", userData.id);
      formData.append("email", values.email);
      formData.append("name", values.name);
      formData.append("avatar_url", userImage);
      console.log("AVATAR URL", userImage);

      console.log("AVATAR URL", formData);

      const response = await apiService.post(
        "/api/auth/editprofile/",
        formData
      );

      if (response.access) {
        router.push("/");
        console.log("SUCCESSFULL");
      } else if (response.non_field_errors) {
        setApiError(response.non_field_errors);
      }
    }
  };

  const errorClass = "border-red-500";
  const noErrorClass = "border-gray-300";

  return (
    <div className="shadow-md pt-8 lg:max-w-[50%] md:max-w-[60%] sm:max-w-[95%] mx-auto p-4 relative  border border-gray">
      <div className="absolute top-25 left-15">
        <BackArrow />
      </div>
      <h2 className="mb-6 text-3xl text-center text-airbnb">Edit Profile</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={EditProfileSchema(emailList, nameList)}
        onSubmit={submitForm}
      >
        {({ errors, setFieldValue }) => (
          <Form>
            <div className="pt-3 pb-6 space-y-4">
              <div className="flex flex-col space-y-2 items-center">
                <div className="flex items-center justify-center relative w-[26%]">
                  <Image
                    src={avatarUrl || "/profiles/profile1.png"}
                    alt="profile"
                    width={200}
                    height={200}
                    className="rounded-full cursor-pointer"
                  />
                  <div className="absolute inset-0 flex items-center rounded-full justify-center bg-gray-800 bg-opacity-60 text-white text-sm font-semibold opacity-0 hover:opacity-40 transition-opacity duration-300 cursor-pointer ">
                    <label className="cursor-pointer">
                      Change Avatar
                      <input
                        type="file"
                        name="avatar_url"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            const file = e.target.files[0];
                            setUserImage(file);
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              if (reader.result) {
                                setAvatarUrl(reader.result as string);
                                // setFieldValue("avatar_url", file.name);
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <label>Email address</label>
                <Field
                  type="email"
                  name="email"
                  className={`bg-gray-50 border ${
                    errors.email ? errorClass : noErrorClass
                  } text-gray-900 rounded-lg block w-full p-2.5 focus:border-gray-900 focus:outline-none`}
                  placeholder="Email address here ..."
                ></Field>
                {errors.email && (
                  <small className="italic text-red-500">{errors.email}</small>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <label>User name</label>
                <Field
                  type="text"
                  name="name"
                  className={`bg-gray-50 border ${
                    errors.name ? errorClass : noErrorClass
                  } text-gray-900 rounded-lg block w-full p-2.5 focus:border-gray-900 focus:outline-none`}
                  placeholder="User name here ..."
                ></Field>
                {errors.name && (
                  <small className="italic text-red-500">{errors.name}</small>
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

export default EditProfileForm;
