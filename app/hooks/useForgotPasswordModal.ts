import { create } from "zustand";

interface ForgotPasswordStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useForgotPasswordModal = create<ForgotPasswordStore>((set) => ({
  isOpen: false,
  open: () => set({isOpen : true}),
  close: () => set({isOpen : false})
}))

export default useForgotPasswordModal;