"use client";

import { useState } from "react";

// Custom component
import MenuLink from "./MenuLink";

const UserNav = () => {
  const [isOpen, SetIsOpen] = useState(false);

  return (
    <div className="p-2 relative inline-block border rounded-full">
      <button className="flex items-center" onClick={() => SetIsOpen(!isOpen)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute w-[220px] top-[50px] right-0 bg-white shadow-md border border-gray-100 rounded-xl cursor-pointer flex flex-col">
          <MenuLink
            label="Log In"
            isFirst={true}
            onClick={() => console.log("Log In")}
          />
          <MenuLink label="Profile" onClick={() => console.log("Profile")} />

          <MenuLink
            label="Sign Out"
            isLast={true}
            onClick={() => console.log("Sign Out")}
          />
        </div>
      )}
    </div>
  );
};

export default UserNav;
