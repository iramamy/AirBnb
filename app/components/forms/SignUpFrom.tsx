const SignUpFrom = () => {
  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <form className="space-y-4 md:space-y-6" action="#">
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:border-gray-900 focus:outline-none"
            placeholder="name@company.com"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:border-gray-900 focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="confirm-password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Confirm password
          </label>
          <input
            type="confirm-password"
            name="confirm-password"
            id="confirm-password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:border-gray-900 focus:outline-none"
          />
        </div>
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              aria-describedby="terms"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="terms"
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
        <button
          type="submit"
          className="w-full text-white bg-airbnb font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-airbnb-dark "
        >
          Create an account
        </button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-450">
          Already have an account?{" "}
          <a
            href="#"
            className="font-medium text-airbnb hover:underline hover:text-airbnb-dark  dark:text-primary-500"
          >
            Login here
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignUpFrom;
