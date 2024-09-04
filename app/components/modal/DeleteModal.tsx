"use client";

// Custom components
import Modal from "./Modal";
import useDeleteModal from "@/app/hooks/useDeleteModal";
import DeleteContent from "../forms/DeleteContent";

const DeleteModal = () => {
  const deleteModal = useDeleteModal();
  return (
    <Modal
      isOpen={deleteModal.isOpen}
      close={deleteModal.close}
      title="Are you sure to delete this property?"
      content={<DeleteContent />}
    />
  );
};

export default DeleteModal;
