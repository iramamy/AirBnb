"use client";
import Image from "next/image";

// Custom components
import CustomButton from "../forms/CustomButton";

const ConversationDetail = () => {
  return (
    <div className="max-h-[400px] overflow-auto flex flex-col space-y-4 justify-between h-full">
      {/* Sender */}

      <div className="space-y-4">
        <div className="flex gap-2.5">
          <Image
            width={100}
            height={100}
            className="w-8 h-8 rounded-full"
            src="/profiles/profile1.png"
            alt="Jese image"
          />
          <div className="flex flex-col w-full max-w-[80%] leading-1.5 p-4 border-gray-200 rounded-e-xl rounded-es-xl dark:bg-gray-700">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                Bonnie Green
              </span>
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                11:46
              </span>
            </div>
            <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
              That's awesome. I think our users will really appreciate the
              improvements.
            </p>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Delivered
            </span>
          </div>
        </div>

        {/* Receiver */}
        <div className="w-[80%] ml-[20%] py-4 px-6 rounded-l-xl rounded-tr-xl bg-blue-200">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-semibold text-gray-900">
              Bonnie Green
            </span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              11:46
            </span>
          </div>
          <p className="text-sm font-normal py-2.5 text-gray-900">
            That's awesome. I think our users will really appreciate the
            improvements.
          </p>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Delivered
          </span>
        </div>
      </div>

      <div className="relative">
        <input
          type="text"
          className="focus:outline-none block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-100 rounded-lg bg-gray-100 dark:border-gray-300 dark:placeholder-gray-400"
          placeholder="Type your message ..."
          required
        />
        <CustomButton
          label="Send"
          onClick={() => console.log("Clicked")}
          isAbsolute={true}
        />
      </div>
    </div>
  );
};

export default ConversationDetail;
