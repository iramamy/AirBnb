import React from "react";
import ConversationDetail from "@/app/components/inbox/ConversationDetail";

const ChatPage = () => {
  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <h1 className="my-6 text-2xl">ChatPage</h1>
      <ConversationDetail />
    </main>
  );
};

export default ChatPage;
