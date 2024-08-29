"use client";
import Image from "next/image";

// Custom components
import CustomButton from "../components/forms/CustomButton";
import BackArrow from "../components/BackArrow";

const EditProfile = () => {
  return (
    <div className="shadow-md pt-8 lg:max-w-[50%] md:max-w-[60%] sm:max-w-[95%] mx-auto p-4 relative  border border-gray">
      <div className="absolute top-25 left-15">
        <BackArrow />
      </div>
      <h2 className="mb-6 text-3xl text-center text-airbnb">Edit Profile</h2>

      <form action="">
        <div className="pt-3 pb-6 space-y-4">
          <div className="flex flex-col space-y-2 items-center">
            <div className="flex items-center justify-center relative w-[26%]">
              <Image
                src="/profiles/profile1.png"
                alt="profile"
                width={200}
                height={200}
                className="rounded-full cursor-pointer"
              />
              <div className="absolute inset-0 flex items-center rounded-full justify-center bg-gray-800 bg-opacity-60 text-white text-sm font-semibold opacity-0 hover:opacity-40 transition-opacity duration-300 cursor-pointer ">
                Change Avatar
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <label>Email address</label>
            <input
              type="email"
              className="focus:outline-none block w-full py-3 ps-4 text-md text-gray-900 border border-gray-100 rounded-lg bg-gray-100 dark:border-gray-300 dark:placeholder-gray-400"
              placeholder="Email address here ..."
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label>User name</label>
            <input
              type="text"
              className="focus:outline-none block w-full py-3 ps-4 text-md text-gray-900 border border-gray-100 rounded-lg bg-gray-100 dark:border-gray-300 dark:placeholder-gray-400"
              placeholder="User name here ..."
            />
          </div>
        </div>

        <CustomButton label="Save change" isEdit={true} />
      </form>
    </div>
  );
};

export default EditProfile;
