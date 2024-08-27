"use client";

import { useRouter } from "next/navigation";
import { resetAuthCookes } from "../lib/actions";

// Custom components
import MenuLink from "./navbar/MenuLink";

const LogOutButton: React.FC = () => {
  const router = useRouter();
  const submitLogout = async () => {
    resetAuthCookes();
    router.push("/");
  };
  return <MenuLink label="Log Out" onClick={submitLogout} isLast={true} />;
};

export default LogOutButton;
