"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";

// Custom components
import CustomButton from "./CustomButton";
import BackArrow from "../BackArrow";
import EditProfileSchema from "./EditProfileValidation";
import apiService from "@/app/services/apiService";

type EditProfileFormValues = {
  email: string;
  name: string;
};

interface EditProfileFormProps {
  userData: {
    email: string;
    name: string;
    avatar_url: string;
  };
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ userData }) => {
  // console.log(userData);

  // const [dataValidator, setDataValidator] = useState<string[]>([]);
  const [emailList, setEmailList] = useState<string[]>([]);
  const [nameList, setNameList] = useState<string[]>([]);
  const [avatarUrl, setAvatarUrl] = useState<string>(userData.avatar_url);
  const [avatarName, setAvatarName] = useState<string>("");

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

      // setDataValidator({ emails, names });
      setEmailList(filteredEmails);
      setNameList(filteredNames);
    };

    fetchUserData();
  }, []);

  // Image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.result) {
          setAvatarUrl(reader.result as string);
          setAvatarName(file.name);
        }
      };

      reader.readAsDataURL(file);
    }
    console.log(avatarName);
  };

  const initialValues = {
    email: userData.email,
    name: userData.name,
    avatar_url: userData.avatar_url,
  };

  const submitForm = (values: EditProfileFormValues) => {
    console.log(values);
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
        {({ errors }) => (
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
                        accept="image/*"
                        onChange={handleImageUpload}
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
