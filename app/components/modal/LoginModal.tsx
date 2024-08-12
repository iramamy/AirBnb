"use client";
import { useState } from "react";

// Custom components
import Modal from "./Modal";
import useLoginModal from "@/app/hooks/useLoginModal";
import LoginForm from "../forms/LoginForm";

const LoginModal = () => {
  const loginModal = useLoginModal();
  return (
    <Modal
      isOpen={loginModal.isOpen}
      close={loginModal.close}
      title="Sign in to your account"
      content={<LoginForm close={loginModal.close} />}
    />
  );
};

export default LoginModal;
