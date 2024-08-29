"use client";

// Custom components
import Modal from "./Modal";
import useSignUpModal from "@/app/hooks/useSignUpModal";
import SignUpFrom from "../forms/SignUpFrom";

const SignUpModal = () => {
  const signUpModal = useSignUpModal();
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
