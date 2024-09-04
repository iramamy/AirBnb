import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Custom components
import CustomButton from "./CustomButton";
import useDeleteModal from "@/app/hooks/useDeleteModal";
import apiService from "@/app/services/apiService";

const DeleteContent = () => {
  const deleteModal = useDeleteModal();
  const router = useRouter();
  const [apiError, setApiError] = useState(false);

  const searchParams = useSearchParams();
  const propertyId = searchParams.get("id") || "";

  const handleDelete = async () => {
    const response = await apiService.get(
      `/api/properties/deleteproperty/${propertyId}/`
    );

    if (response.success) {
      router.push("/myproperty/");
      deleteModal.close();
    } else {
      setApiError(true);
      deleteModal.close();
    }
  };

  return (
    <div className="flex w-[100%] justify-between">
      <CustomButton
        label="Cancel"
        isPrev={true}
        onClick={() => deleteModal.close()}
      />
      <CustomButton label="Delete" onClick={handleDelete} />
    </div>
  );
};

export default DeleteContent;
