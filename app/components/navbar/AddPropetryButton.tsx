"use client";

// Custom components
import useAddPropertyModal from "@/app/hooks/useAddPropertyModal";
import useLoginModal from "@/app/hooks/useLoginModal";

interface AddPropetryButtonProps {
  userId?: string | null;
}

const AddPropetryButton: React.FC<AddPropetryButtonProps> = ({ userId }) => {
  const loginModal = useLoginModal();
  const addPropertyModal = useAddPropertyModal();
  const airbnbYouHome = () => {
    if (userId) {
      addPropertyModal.open();
    } else {
      loginModal.open();
    }
  };

  return (
    <div
      onClick={airbnbYouHome}
      className="p-2 text-sm font-semibold rounded-full hover:bg-gray-100 cursor-pointer"
    >
      Djangobnb your home
    </div>
  );
};

export default AddPropetryButton;
