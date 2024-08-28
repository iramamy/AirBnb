"use client";

// Custom components
import useLoginModal from "../hooks/useLoginModal";
import { useRouter } from "next/navigation";
import apiService from "../services/apiService";

interface ContactButtonProps {
  userId?: string | null;
  landlordId?: string;
}

const ContactButton: React.FC<ContactButtonProps> = ({
  userId,
  landlordId,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const startConversation = async () => {
    if (userId) {
      const conversation_url = `/api/chat/start/${landlordId}/`;
      const conversation = await apiService.get(conversation_url);

      if (conversation.conversation_id) {
        router.push(`/inbox/${conversation.conversation_id}/`);
      }
    } else {
      loginModal.open();
    }
  };
  return (
    <div
      onClick={startConversation}
      className="mt-6 py-4 px-6 bg-airbnb text-white rounded-xl cursor-pointer hover:bg-airbnb-dark transition"
    >
      Contact
    </div>
  );
};

export default ContactButton;
