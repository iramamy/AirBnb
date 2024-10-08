// Custom components
import Conversation from "../components/inbox/Conversation";
import { getUserId } from "../lib/actions";
import apiService from "../services/apiService";
import BackArrow from "../components/BackArrow";

export type UserType = {
  id: string;
  name: string;
  avatar_url: string;
};

export type ConversationType = {
  id: string;
  users: UserType[];
};

const InboxPage = async () => {
  const userId = await getUserId();

  const conversations = await apiService.get(`/api/chat/`);

  if (!userId) {
    return (
      <main className="max-w-[1500px] max-auto px-6 py-12">
        <p>You need to be authenticated...</p>
      </main>
    );
  }

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6 space-y-4">
      <div className="flex items-center gap-14">
        <BackArrow />
        <h1 className="my-6 text-2xl">Inbox</h1>
      </div>
      {conversations.map((conversation: ConversationType) => {
        return (
          <Conversation
            key={conversation.id}
            userId={userId}
            conversation={conversation}
          />
        );
      })}
    </main>
  );
};

export default InboxPage;
