import { create } from "zustand";

interface DeleteReservationModalStore {
  isOpen: boolean;
  open: (id: string) => void;
  reservationId: string | undefined;
  close: () => void;
  
}

const useDeleteReservationModal = create<DeleteReservationModalStore>((set) => ({
  isOpen: false,
  reservationId: undefined,
  open: (id: string) => set({isOpen : true, reservationId: id}),
  close: () => set({isOpen : false, reservationId: undefined})
}))

export default useDeleteReservationModal;