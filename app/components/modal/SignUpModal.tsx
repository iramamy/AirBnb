"use client";

import { useRouter } from "next/navigation";

// Custom components
import Modal from "./Modal";
import useSignUpModal from "@/app/hooks/useSignUpModal";
import SignUpFrom from "../forms/SignUpFrom";
import { Sign } from "crypto";

const SignUpModal = () => {
  const signUpModal = useSignUpModal();
  // const content = SignUpFrom();
  return (
    <Modal
      isOpen={signUpModal.isOpen}
      close={signUpModal.close}
      title="Create an account"
      content={<SignUpFrom close={signUpModal.close} />}
    />
  );
};

export default SignUpModal;
