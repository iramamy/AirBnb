"use client";

import { useRouter } from "next/navigation";
import { resetAuthCookies } from "../lib/actions";

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
    router.push("/");
  };
  return <MenuLink label="Log Out" onClick={submitLogout} isLast={true} />;
};

export default LogOutButton;
