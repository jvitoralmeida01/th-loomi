"use client";

import { useEffect, useRef } from "react";
import { useChatSelector } from "../_store/hooks";
import { ChatRootState } from "../_store/chatStore";
import MessageBubble, { AiSuggestionSkeleton } from "./MessageBubble";
import { ChatAction } from "../_store/chatSlice";

interface ChatMessagesProps {
  onActionClick?: (action: ChatAction) => void;
}

function formatDateHeader(timestamp: string): string {
  const date = new Date(timestamp);
  const today = new Date();

  if (date.toDateString() === today.toDateString()) {
    return `HOJE, ${date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ChatMessages({ onActionClick }: ChatMessagesProps) {
  const messages = useChatSelector(
    (state: ChatRootState) => state.chat.messages
  );
  const isLoadingAiSuggestion = useChatSelector(
    (state: ChatRootState) => state.chat.isLoadingAiSuggestion
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoadingAiSuggestion]);

  const firstMessageDate =
    messages.length > 0 ? formatDateHeader(messages[0].timestamp) : null;

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4">
      {firstMessageDate && (
        <div className="text-center mb-6">
          <span className="text-xs font-montserrat text-neutral-400 uppercase tracking-wider">
            {firstMessageDate}
          </span>
        </div>
      )}

      <div className="flex flex-col gap-6">
        {messages.map((message, index) => (
          <MessageBubble
            key={message.id}
            message={message}
            isLastMessage={index === messages.length - 1}
            onActionClick={onActionClick}
          />
        ))}
        {isLoadingAiSuggestion && <AiSuggestionSkeleton />}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
