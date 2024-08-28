import Image from "next/image";
import Link from "next/link";

// Custom components
import ConversationDetail from "@/app/components/inbox/ConversationDetail";
import { getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";
import { UserType } from "../page";
import { getAccessToken } from "@/app/lib/actions";

export type MessageType = {
  id: string;
  name: string;
  body: string;
  conversationId: string;
  sent_to: UserType;
  created_by: UserType;
};

const ChatPage = async ({ params }: { params: { id: string } }) => {
  const userId = await getUserId();
  const token = await getAccessToken();

  if (!userId || !token) {
    return (
      <main className="max-w-[1500px] max-auto px-6 py-12">
        <p>You need to be authenticated...</p>
      </main>
    );
  }

  const conversation = await apiService.get(`/api/chat/${params.id}/`);
  const landLord = conversation.conversation.users?.find(
    (user: any) => user.id !== userId
  );

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <Link
        href={`/landlord/${landLord.id}`}
        className="flex items-center gap-2.5"
      >
        <Image
          width={200}
          height={200}
          className="w-8 h-8 rounded-full"
          src={
            landLord?.avatar_url
              ? landLord?.avatar_url
              : "/profiles/profile1.png"
          }
          alt={`${landLord?.name} image`}
        />
        <h1 className="my-2 text-2xl">{landLord.name}</h1>
      </Link>

      <ConversationDetail
        token={token}
        userId={userId}
        messages={conversation.messages}
        conversation={conversation.conversation}
      />
    </main>
  );
};

export default ChatPage;
