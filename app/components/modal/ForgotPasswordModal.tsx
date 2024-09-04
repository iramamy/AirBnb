"use client";

// Custom components
import Modal from "./Modal";
import useForgotPasswordModal from "@/app/hooks/useForgotPasswordModal";
import ForgotPasswordForm from "../forms/ForgotPasswordForm";

const ForgotPasswordModal = () => {
  const forgotPasswordModal = useForgotPasswordModal();
  return (
    <Modal
      isOpen={forgotPasswordModal.isOpen}
      close={forgotPasswordModal.close}
      title="Forgot password"
      content={<ForgotPasswordForm />}
    />
  );
};

export default ForgotPasswordModal;
