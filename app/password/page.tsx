// Custom components
import CustomButton from "../components/forms/CustomButton";
import BackArrow from "../components/BackArrow";

const ChangePassword = () => {
  return (
    <div className="shadow-md mt-10 pt-8 lg:max-w-[50%] md:max-w-[60%] sm:max-w-[95%] mx-auto p-4 relative border border-gray">
      <div className="absolute top-25 left-15">
        <BackArrow />
      </div>
      <h2 className="mb-6 text-3xl text-center text-airbnb">Change password</h2>

      <form action="">
        <div className="pt-3 pb-6 space-y-4">
          <div className="flex flex-col space-y-2">
            <label>Old password</label>
            <input
              type="password"
              className="focus:outline-none block w-full py-3 ps-4 text-md text-gray-900 border border-gray-100 rounded-lg bg-gray-100 dark:border-gray-300 dark:placeholder-gray-400"
              placeholder="Old password here ..."
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label>New password</label>
            <input
              type="password"
              className="focus:outline-none block w-full py-3 ps-4 text-md text-gray-900 border border-gray-100 rounded-lg bg-gray-100 dark:border-gray-300 dark:placeholder-gray-400"
              placeholder="New password here ..."
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label>Confirm password</label>
            <input
              type="password"
              className="focus:outline-none block w-full py-3 ps-4 text-md text-gray-900 border border-gray-100 rounded-lg bg-gray-100 dark:border-gray-300 dark:placeholder-gray-400"
              placeholder="Confirm password here ..."
            />
          </div>
        </div>

        <CustomButton label="Save change" isEdit={true} />
      </form>
    </div>
  );
};

export default ChangePassword;
