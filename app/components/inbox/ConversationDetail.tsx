"use client";
import Image from "next/image";
import useWebSocket from "react-use-websocket";
import { useEffect, useState, useRef } from "react";

// Custom components
import CustomButton from "../forms/CustomButton";
import { ConversationType } from "@/app/inbox/page";
import { MessageType } from "@/app/inbox/[id]/page";
import { UserType } from "@/app/inbox/page";

interface ConversationDetailProps {
  conversation: ConversationType;
  messages: MessageType[];
  userId: string;
  token: string;
}

const ConversationDetail: React.FC<ConversationDetailProps> = ({
  conversation,
  messages,
  userId,
  token,
}) => {
  const otherUser = conversation.users?.find((user) => user.id !== userId);
  const myUser = conversation.users?.find((user) => user.id === userId);

  // Message variables
  const [newMessage, setNewMessage] = useState("");
  const [realTimeMessage, setRealTimeMessage] = useState<MessageType[]>([]);
  const messageDiv = useRef<HTMLDivElement>(null);

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    `ws://127.0.0.1:8000/ws/${conversation.id}/?token=${token}`,
    {
      share: false,
      shouldReconnect: () => true,
    }
  );

  const scrollToBottom = () => {
    if (messageDiv.current) {
      messageDiv.current.scrollTop = messageDiv.current.scrollHeight;
    }
  };

  useEffect(() => {
    console.log("CONNECTION STATE CHANGED", readyState);
  }, [readyState]);

  useEffect(() => {
    if (
      lastJsonMessage &&
      typeof lastJsonMessage === "object" &&
      "name" in lastJsonMessage &&
      "body" in lastJsonMessage
    ) {
      const isSentByCurrentUser = lastJsonMessage.name === myUser?.name;
      const message: MessageType = {
        id: "",
        name: lastJsonMessage.name as string,
        body: lastJsonMessage.body as string,
        sent_to: isSentByCurrentUser
          ? (otherUser as UserType)
          : (myUser as UserType),
        created_by: isSentByCurrentUser
          ? (myUser as UserType)
          : (otherUser as UserType),
        conversationId: conversation.id,
      };

      setRealTimeMessage((realTimeMessage) => [...realTimeMessage, message]);
    }
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  }, [lastJsonMessage]);

  // Send message
  const sendMessage = async () => {
    if (newMessage.trim() != "") {
      sendJsonMessage({
        event: "chat_message",
        data: {
          body: newMessage,
          name: myUser?.name,
          sent_to_id: otherUser?.id,
          conversation_id: conversation.id,
        },
      });
    }

    setNewMessage("");

    setTimeout(() => {
      scrollToBottom();
    }, 100);
  };

  return (
    <>
      <div
        ref={messageDiv}
        className="min-h-[435px] max-h-[435px] overflow-auto flex flex-col space-y-2 justify-between h-full"
      >
        <div className="space-y-2">
          {[...messages, ...realTimeMessage].map((message, index) =>
            message.created_by.name === myUser?.name ? (
              <div
                key={message.id}
                className="ml-[20%] py-4 px-6 rounded-l-xl rounded-tr-xl bg-blue-200 max-w-[80%]"
              >
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="text-sm font-semibold text-gray-900">
                    {myUser?.name}
                  </span>
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    11:46
                  </span>
                </div>
                <p className="text-sm font-normal py-2.5 text-gray-900">
                  {message.body}
                </p>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  Delivered
                </span>
              </div>
            ) : (
              <div key={index} className="flex gap-2.5">
                <Image
                  width={50}
                  height={50}
                  className="w-8 h-8 rounded-full"
                  src={
                    otherUser?.avatar_url
                      ? otherUser?.avatar_url
                      : "/profiles/profile1.png"
                  }
                  alt={`${otherUser?.name} image`}
                />
                <div className="flex flex-col w-full max-w-[80%] leading-1.5 p-4 border-gray-200 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {otherUser?.name}
                    </span>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      11:46
                    </span>
                  </div>
                  <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                    {message.body}
                  </p>
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Delivered
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <div className="relative mt-2">
        <input
          type="text"
          className="focus:outline-none block w-full p-4 text-sm text-gray-900 border border-gray-100 rounded-lg bg-gray-100 dark:border-gray-300 dark:placeholder-gray-400"
          placeholder="Type your message ..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <CustomButton label="Send" onClick={sendMessage} isAbsolute={true} />
      </div>
    </>
  );
};

export default ConversationDetail;
