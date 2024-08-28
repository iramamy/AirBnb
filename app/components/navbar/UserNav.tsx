"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// Custom component
import MenuLink from "./MenuLink";
import useLoginModal from "@/app/hooks/useLoginModal";
import useSignUpModal from "@/app/hooks/useSignUpModal";
import LogOutButton from "../LogOutButton";

interface userNavProps {
  userId?: string | null;
}

const UserNav: React.FC<userNavProps> = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const loginModal = useLoginModal();
  const signUpModal = useSignUpModal();

  const router = useRouter();
  const dropDownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-2 relative inline-block border rounded-full cursor-pointer">
      <div
        className="flex items-center"
        onClick={() => setIsOpen(!isOpen)}
        ref={buttonRef}
      >
        <svg
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
      </div>

      {isOpen && (
        <div
          ref={dropDownRef}
          className="absolute w-[220px] top-[50px] right-0 bg-white shadow-md border border-gray-100 rounded-xl cursor-pointer flex flex-col"
        >
          {userId ? (
            <>
              <MenuLink
                label="Inbox"
                isFirst={true}
                onClick={() => {
                  setIsOpen(false);
                  router.push(`/inbox/`);
                }}
              />
              <MenuLink
                label="My properties"
                onClick={() => {
                  setIsOpen(false);
                  router.push(`/myproperty/`);
                }}
              />
              <MenuLink
                label="My reservations"
                onClick={() => {
                  setIsOpen(false);
                  router.push(`/myreservations/`);
                }}
              />
              <MenuLink
                label="My favorites"
                onClick={() => {
                  setIsOpen(false);
                  router.push(`/myfavorites/`);
                }}
              />
              <LogOutButton
                onClick={() => {
                  setIsOpen(false);
                }}
              />
            </>
          ) : (
            <>
              <MenuLink
                label="Log In"
                isFirst={true}
                onClick={() => {
                  loginModal.open();
                  setIsOpen(false);
                }}
              />

              <MenuLink
                label="Sign Up"
                onClick={() => {
                  signUpModal.open();
                  setIsOpen(false);
                }}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserNav;
