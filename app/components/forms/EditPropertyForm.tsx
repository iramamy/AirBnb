"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// Custom components

import PropertyCategories from "../addCategory/Categories";
import SelectCountry, { SelectCountryValue } from "./SelectCountry";
import CustomButton from "@/app/components/forms/CustomButton";
import BackArrow from "@/app/components/BackArrow";
import EditPropertySchema from "./EditPropertyValidation";
import apiService from "@/app/services/apiService";
import useDeleteModal from "@/app/hooks/useDeleteModal";

type EditProfileFormValues = {
  id: string;
  country: string;
  category: string;
  title: string;
  description: string;
  price_per_night: string;
  bedrooms: string;
  guests: string;
  image_url: string;
};

interface EditProfileFormProps {
  property: EditProfileFormValues;
}

const EditPropertyForm: React.FC<EditProfileFormProps> = ({ property }) => {
  const [imageUrl, setImageUrl] = useState<string>(property.image_url);
  const [propertyImage, setPropertyImage] = useState<File | null>(null);

  const [selectedCountry, setSelectedCountry] =
    useState<SelectCountryValue | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [apiError, setApiError] = useState("");
  const deleteModal = useDeleteModal();

  const router = useRouter();

  const initialValues = {
    id: property.id,
    country: property.country,
    category: property.category,
    title: property.title,
    description: property.description,
    price_per_night: property.price_per_night,
    bedrooms: property.bedrooms,
    guests: property.guests,
    image_url: property.image_url,
  };

  useEffect(() => {
    setSelectedCountry({ label: property.country, value: property.country });
    setSelectedCategory(property.category);
  }, [property]);

  //   Set formik on submit function
  const submitForm = async (values: EditProfileFormValues) => {
    if (
      values.country &&
      values.category &&
      values.title &&
      values.description &&
      values.price_per_night &&
      values.bedrooms &&
      values.guests
    ) {
      const formData = new FormData();
      formData.append("property_id", property.id);
      formData.append("country", values.country);
      formData.append("category", values.category);
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("price_per_night", values.price_per_night);
      formData.append("bedrooms", values.bedrooms);
      formData.append("guests", values.guests);
      if (propertyImage) {
        formData.append("image_url", propertyImage);
      } else {
        formData.append("image_url", imageUrl);
      }

      const response = await apiService.post(
        "/api/properties/editproperty/",
        formData
      );

      if (response.success) {
        toast.success("Property updated successfully!");
        router.push("/");
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
      <h2 className="mb-6 text-3xl text-center text-airbnb">Edit property</h2>
      {apiError && (
        <div className="text-red-500 text-center mt-0">
          Something went wrong, please try agin later.
        </div>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={EditPropertySchema}
        onSubmit={submitForm}
      >
        {({ errors, handleChange }) => (
          <Form>
            <h2 className="mb-6 text-xl">Property image</h2>
            <div className="max-h-[250px] w-[100%] overflow-hidden aspect-square mb-2 cursor-pointer items-center relative">
              <div className="flex items-center ">
                <Image
                  src={imageUrl || "/properties/beach_1.jpg"}
                  fill
                  className=""
                  alt="Properties"
                />

                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60 text-white text-sm font-semibold opacity-0 hover:opacity-40 transition-opacity duration-300 cursor-pointer ">
                  <label className="cursor-pointer">
                    Change image
                    <input
                      type="file"
                      name="image_url"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const file = e.target.files[0];
                          setPropertyImage(file);
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            if (reader.result) {
                              setImageUrl(reader.result as string);
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
            <h2 className="mb-6 text-2xl">Country</h2>
            <div className="pt-3 pb-6 space-y-4">
              {selectedCountry && (
                <SelectCountry
                  value={selectedCountry}
                  onChange={(value) => {
                    setSelectedCountry(value);
                    handleChange({
                      target: { name: "country", value: value.label },
                    });
                  }}
                />
              )}
            </div>
            <h2 className="mb-6 text-xl">Choose Category</h2>
            {selectedCategory && (
              <PropertyCategories
                dataCategory={selectedCategory}
                setCategory={(category) => {
                  setSelectedCategory(category);
                  handleChange({
                    target: { name: "category", value: category },
                  });
                }}
              />
            )}
            <h2 className="mb-6 text-2xl">Describe your place</h2>

            <div className="pt-3 pb-6 space-y-4">
              <div className="flex flex-col space-y-2">
                <label>Title</label>
                <Field
                  type="text"
                  name="title"
                  className={`bg-gray-50 border ${
                    errors.title ? errorClass : noErrorClass
                  } text-gray-900 rounded-lg block w-full p-2.5 focus:border-gray-900 focus:outline-none`}
                  placeholder="Title here ..."
                ></Field>
                {errors.title && (
                  <small className="italic text-red-500">{errors.title}</small>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <label>Description</label>
                <Field
                  as="textarea"
                  name="description"
                  className={`bg-gray-50 border ${
                    errors.description ? errorClass : noErrorClass
                  } text-gray-900 rounded-lg block w-full p-2.5 focus:border-gray-900 focus:outline-none resize-none`}
                  placeholder="Description here ..."
                ></Field>
                {errors.description && (
                  <small className="italic text-red-500">
                    {errors.description}
                  </small>
                )}
              </div>
            </div>

            <h2 className="mb-6 text-2xl">Details</h2>
            <div className="pt-3 pb-6 space-y-4">
              <div className="flex flex-col space-y-2">
                <label>Price per night</label>
                <Field
                  type="text"
                  name="price_per_night"
                  className={`bg-gray-50 border ${
                    errors.price_per_night ? errorClass : noErrorClass
                  } text-gray-900 rounded-lg block w-full p-2.5 focus:border-gray-900 focus:outline-none`}
                  placeholder="Price here ..."
                ></Field>
                {errors.price_per_night && (
                  <small className="italic text-red-500">
                    {errors.price_per_night}
                  </small>
                )}
              </div>

              <div className="flex flex-col space-y-2">
                <label>Number of bedrooms</label>
                <Field
                  type="text"
                  name="bedrooms"
                  className={`bg-gray-50 border ${
                    errors.bedrooms ? errorClass : noErrorClass
                  } text-gray-900 rounded-lg block w-full p-2.5 focus:border-gray-900 focus:outline-none`}
                  placeholder="Bedrooms here ..."
                ></Field>
                {errors.bedrooms && (
                  <small className="italic text-red-500">
                    {errors.bedrooms}
                  </small>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <label> Maximum number of guests</label>
                <Field
                  type="text"
                  name="guests"
                  className={`bg-gray-50 border ${
                    errors.guests ? errorClass : noErrorClass
                  } text-gray-900 rounded-lg block w-full p-2.5 focus:border-gray-900 focus:outline-none`}
                  placeholder="Guests here ..."
                ></Field>
                {errors.guests && (
                  <small className="italic text-red-500">{errors.guests}</small>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <CustomButton label="Save change" isEdit={true} />
              <button
                onClick={() => deleteModal.open()}
                type="button"
                className="text-white end-2.5 bottom-2.5
                    bg-black hover:bg-gray-800 font-medium rounded-lg text-sm px-4 py-2 w-[100%]"
              >
                Delete property
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditPropertyForm;
