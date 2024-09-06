import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// Custom components
import CustomButton from "./CustomButton";
import useDeleteReservationModal from "@/app/hooks/useDeleteReservationModal";
import apiService from "@/app/services/apiService";

const DeleteReservationContent = () => {
  const deleteReservationModal = useDeleteReservationModal();
  const router = useRouter();
  const reservationId = deleteReservationModal.reservationId;

  const handleDelete = async () => {
    const url = `/api/properties/deletereservation/${reservationId}/`;
    const response = await apiService.get(url);

    if (response.success) {
      toast.success("Reservation deleted successfully!");
      router.refresh();
      deleteReservationModal.close();
    } else {
      toast.error("Something went wrong, please try again later!");
      router.push("/myreservations/");
      deleteReservationModal.close();
    }
  };

  return (
    <div className="flex w-[100%] justify-between">
      <CustomButton
        label="Cancel"
        isPrev={true}
        onClick={() => deleteReservationModal.close()}
      />
      <CustomButton label="Delete" onClick={handleDelete} />
    </div>
  );
};

export default DeleteReservationContent;
