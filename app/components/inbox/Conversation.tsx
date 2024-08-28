"use client";

import { useRouter } from "next/navigation";

// Custom components
import { ConversationType } from "@/app/inbox/page";

interface ConversationProps {
  conversation: ConversationType;
  userId: string;
}
const Conversation: React.FC<ConversationProps> = ({
  conversation,
  userId,
}) => {
  const router = useRouter();
  const otherUser = conversation.users.find((user) => user.id !== userId);

  return (
    <div className="px-6 py-4 border border-gray-300 rounded-xl cursor-pointer">
      <p className="mb-6 text-xl hover:text-gray-700">{otherUser?.name}</p>
      <p
        onClick={() => router.push(`/inbox/${conversation.id}`)}
        className="text-airbnb-dark hover:text-airbnb"
      >
        Go to conversation
      </p>
    </div>
  );
};

export default Conversation;
