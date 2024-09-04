"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// Custom components
import Modal from "./Modal";
import useAddPropertyModal from "@/app/hooks/useAddPropertyModal";
import CustomButton from "../forms/CustomButton";
import PropertyCategories from "../addCategory/Categories";
import SelectCountry, { SelectCountryValue } from "../forms/SelectCountry";
import apiService from "@/app/services/apiService";

const AddPropertiesModal = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [dataCategory, setDataCategory] = useState("");
  const [dataTitle, setDataTitle] = useState("");
  const [dataDescription, setDataDescription] = useState("");
  const [dataPrice, setDataPrice] = useState("");
  const [dataBedRooms, setDataBedRooms] = useState("");
  const [dataGuests, setDataGuests] = useState("");
  const [dataCountry, setDataCountry] = useState<SelectCountryValue>();
  const [dataImage, setDataImage] = useState<File | null>(null);

  const addPropertyModal = useAddPropertyModal();

  const router = useRouter();

  const setCategory = (category: string) => {
    setDataCategory(category);
  };

  const setImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const tmpImage = event.target.files[0];
      setDataImage(tmpImage);
    }
  };

  const submitForm = async () => {
    if (
      dataCategory &&
      dataTitle &&
      dataDescription &&
      dataPrice &&
      dataBedRooms &&
      dataGuests &&
      dataCountry &&
      dataImage
    ) {
      const formData = new FormData();

      formData.append("title", dataTitle);
      formData.append("description", dataDescription);
      formData.append("price_per_night", dataPrice);
      formData.append("bedrooms", dataBedRooms);
      formData.append("guests", dataGuests);
      formData.append("country", dataCountry.label);
      formData.append("country_code", dataCountry.value);
      formData.append("category", dataCategory);
      formData.append("image", dataImage);

      const response = await apiService.post(
        "/api/properties/create/",
        formData
      );

      if (response.success) {
        toast.success("Property added successfully!");
        router.push("/?added=true");
        addPropertyModal.close();
      } else {
        console.log("ERRORS!!");
      }
    }
  };

  const content = (
    <>
      {currentStep == 1 ? (
        <>
          <h2 className="mb-6 text-2xl">Choose Category</h2>
          <PropertyCategories
            dataCategory={dataCategory}
            setCategory={(category) => setCategory(category)}
          />
          <CustomButton
            label="Next"
            onClick={() => setCurrentStep(currentStep + 1)}
            isAbsolute={true}
          />
        </>
      ) : currentStep == 2 ? (
        <>
          <h2 className="mb-6 text-2xl">Describe your place</h2>

          <div className="pt-3 pb-6 space-y-4">
            <div className="flex flex-col space-y-2">
              <label>Title</label>
              <input
                type="text"
                className="focus:outline-none block w-full py-3 ps-4 text-md text-gray-900 border border-gray-100 rounded-lg bg-gray-100 dark:border-gray-300 dark:placeholder-gray-400"
                placeholder="Title here ..."
                value={dataTitle}
                onChange={(e) => setDataTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label>Description</label>
              <textarea
                className="focus:outline-none block h-[150px] w-full resize-none py-3 ps-4 text-md text-gray-900 border border-gray-100 rounded-lg bg-gray-100 dark:border-gray-300 dark:placeholder-gray-400"
                placeholder="Description here ..."
                value={dataDescription}
                onChange={(e) => setDataDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="flex align-items-center justify-between w-100">
            <CustomButton
              label="Previous"
              onClick={() => setCurrentStep(currentStep - 1)}
              isPrev={true}
            />
            <CustomButton
              label="Next"
              onClick={() => setCurrentStep(currentStep + 1)}
            />
          </div>
        </>
      ) : currentStep == 3 ? (
        <>
          <h2 className="mb-6 text-2xl">Details</h2>
          <div className="pt-3 pb-6 space-y-4">
            <div className="flex flex-col space-y-2">
              <label>Price per night</label>
              <input
                type="text"
                className="focus:outline-none block w-full py-3 ps-4 text-md text-gray-900 border border-gray-100 rounded-lg bg-gray-100 dark:border-gray-300 dark:placeholder-gray-400"
                placeholder="Price here ..."
                value={dataPrice}
                onChange={(e) => setDataPrice(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label>Number of bedrooms</label>
              <input
                type="text"
                className="focus:outline-none block w-full py-3 ps-4 text-md text-gray-900 border border-gray-100 rounded-lg bg-gray-100 dark:border-gray-300 dark:placeholder-gray-400"
                placeholder="Bedrooms here ..."
                value={dataBedRooms}
                onChange={(e) => setDataBedRooms(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label> Maximum number of guests</label>
              <input
                type="text"
                className="focus:outline-none block w-full py-3 ps-4 text-md text-gray-900 border border-gray-100 rounded-lg bg-gray-100 dark:border-gray-300 dark:placeholder-gray-400"
                placeholder="Guests here ..."
                value={dataGuests}
                onChange={(e) => setDataGuests(e.target.value)}
              />
            </div>
          </div>
          <div className="flex align-items-center justify-between w-100">
            <CustomButton
              label="Previous"
              onClick={() => setCurrentStep(currentStep - 1)}
              isPrev={true}
            />
            <CustomButton
              label="Next"
              onClick={() => setCurrentStep(currentStep + 1)}
            />
          </div>
        </>
      ) : currentStep == 4 ? (
        <>
          <h2 className="mb-6 text-2xl">Location</h2>
          <div className="pt-3 pb-6 space-y-4">
            <SelectCountry
              value={dataCountry}
              onChange={(value) => setDataCountry(value as SelectCountryValue)}
            />
          </div>
          <div className="flex align-items-center justify-between w-100">
            <CustomButton
              label="Previous"
              onClick={() => setCurrentStep(currentStep - 1)}
              isPrev={true}
            />
            <CustomButton
              label="Next"
              onClick={() => setCurrentStep(currentStep + 1)}
            />
          </div>
        </>
      ) : (
        <>
          <h2 className="mb-6 text-2xl">Image</h2>
          <div className="pt-3 pb-6 space-y-4">
            <div className="py-4 px-6 bg-gray-600 text-white rounded-xl">
              <input type="file" accept="image/*" onChange={setImage} />
            </div>
            {dataImage && (
              <div className="w-[200px] h-[150px] relative">
                <Image
                  fill
                  alt="uploaded image"
                  src={URL.createObjectURL(dataImage)}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            )}
          </div>
          <div className="flex align-items-center justify-between w-100">
            <CustomButton
              label="Previous"
              onClick={() => setCurrentStep(currentStep - 1)}
              isPrev={true}
            />
            <CustomButton label="Submit" onClick={submitForm} />
          </div>
        </>
      )}
    </>
  );

  return (
    <Modal
      isOpen={addPropertyModal.isOpen}
      close={addPropertyModal.close}
      title="Add property"
      content={content}
    />
  );
};

export default AddPropertiesModal;
