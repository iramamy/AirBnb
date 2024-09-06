"use client";

import { useRouter } from "next/navigation";
import { resetAuthCookies } from "../lib/actions";
import { toast } from "react-toastify";

// Custom components
import MenuLink from "./navbar/MenuLink";

interface LogOutButtonProps {
  onClick: () => void;
}

const LogOutButton: React.FC<LogOutButtonProps> = ({ onClick }) => {
  const router = useRouter();
  const submitLogout = async () => {
    onClick();
    resetAuthCookies();
    toast.success("You are now logged out!");

    router.push("/");
    router.refresh();
  };
  return <MenuLink label="Log Out" onClick={submitLogout} isLast={true} />;
};

export default LogOutButton;
