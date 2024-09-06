"use client";

// Custom components
import Modal from "./Modal";
import useDeleteReservationModal from "@/app/hooks/useDeleteReservationModal";
import DeleteReservationContent from "../forms/DeleteReservationContent";

const DeleteReservationModal = () => {
  const deleteReservationModal = useDeleteReservationModal();
  return (
    <Modal
      isOpen={deleteReservationModal.isOpen}
      close={deleteReservationModal.close}
      title="Are you sure to delete this reservation?"
      content={<DeleteReservationContent />}
    />
  );
};

export default DeleteReservationModal;
