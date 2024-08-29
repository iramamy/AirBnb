import React from "react";
import Image from "next/image";

// Custom components
import PropertyCategories from "@/app/components/addCategory/Categories";
import SelectCountry from "@/app/components/forms/SelectCountry";
import CustomButton from "@/app/components/forms/CustomButton";
import BackArrow from "@/app/components/BackArrow";

const EditProperty = () => {
  return (
    <div className="shadow-md pt-8 lg:max-w-[50%] md:max-w-[60%] sm:max-w-[95%] mx-auto p-4 relative  border border-gray">
      <div className="absolute top-25 left-15">
        <BackArrow />
      </div>
      <h2 className="mb-6 text-3xl text-center text-airbnb">Edit property</h2>
      <form action="">
        <h2 className="mb-6 text-xl">Property image</h2>
        <div className="max-h-[250px] w-[100%] overflow-hidden aspect-square mb-2 cursor-pointer items-center relative">
          <div className="flex items-center ">
            <Image
              src="/properties/beach_1.jpg"
              width={800}
              height={150}
              className=""
              alt="Properties"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60 text-white text-sm font-semibold opacity-0 hover:opacity-40 transition-opacity duration-300 cursor-pointer ">
              Change image
            </div>
          </div>
        </div>
        <h2 className="mb-6 text-2xl">Location</h2>
        <div className="pt-3 pb-6 space-y-4">
          <SelectCountry />
        </div>
        <h2 className="mb-6 text-xl">Choose Category</h2>
        <PropertyCategories />

        <h2 className="mb-6 text-2xl">Describe your place</h2>

        <div className="pt-3 pb-6 space-y-4">
          <div className="flex flex-col space-y-2">
            <label>Title</label>
            <input
              type="text"
              className="focus:outline-none block w-full py-3 ps-4 text-md text-gray-900 border border-gray-100 rounded-lg bg-gray-100 dark:border-gray-300 dark:placeholder-gray-400"
              placeholder="Title here ..."
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label>Description</label>
            <textarea
              className="focus:outline-none block h-[150px] w-full resize-none py-3 ps-4 text-md text-gray-900 border border-gray-100 rounded-lg bg-gray-100 dark:border-gray-300 dark:placeholder-gray-400"
              placeholder="Description here ..."
            ></textarea>
          </div>
        </div>

        <h2 className="mb-6 text-2xl">Details</h2>
        <div className="pt-3 pb-6 space-y-4">
          <div className="flex flex-col space-y-2">
            <label>Price per night</label>
            <input
              type="text"
              className="focus:outline-none block w-full py-3 ps-4 text-md text-gray-900 border border-gray-100 rounded-lg bg-gray-100 dark:border-gray-300 dark:placeholder-gray-400"
              placeholder="Price here ..."
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label>Number of bedrooms</label>
            <input
              type="text"
              className="focus:outline-none block w-full py-3 ps-4 text-md text-gray-900 border border-gray-100 rounded-lg bg-gray-100 dark:border-gray-300 dark:placeholder-gray-400"
              placeholder="Bedrooms here ..."
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label> Maximum number of guests</label>
            <input
              type="text"
              className="focus:outline-none block w-full py-3 ps-4 text-md text-gray-900 border border-gray-100 rounded-lg bg-gray-100 dark:border-gray-300 dark:placeholder-gray-400"
              placeholder="Guests here ..."
            />
          </div>
        </div>
        <CustomButton label="Save change" isEdit={true} />
      </form>
    </div>
  );
};

export default EditProperty;
