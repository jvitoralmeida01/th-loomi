"use client";

import { ChatMessage, ChatAction } from "../_store/chatSlice";
import Image from "next/image";
import RobotIcon from "@/assets/icons/robot.svg";

interface MessageBubbleProps {
  message: ChatMessage;
  isLastMessage: boolean;
  onActionClick?: (action: ChatAction) => void;
}

function formatTime(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function IncomingMessage({ message }: { message: ChatMessage }) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[70%] bg-primary rounded-2xl rounded-bl-md p-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-montserrat font-semibold text-neutral-100">
            {message.author} - Seguro Automóvel
          </span>
          <p className="text-sm font-montserrat text-neutral-100">
            {message.content}
          </p>
          <div className="flex items-center justify-end gap-1 mt-1">
            <span className="text-xs font-montserrat text-neutral-100/70">
              {formatTime(message.timestamp)}
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="text-neutral-100/70"
            >
              <path
                d="M18 7L9.429 17L6 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 7L13.429 17L12 15.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function AssistantMessage({ message }: { message: ChatMessage }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[70%] bg-neutral-100/10 rounded-2xl rounded-br-md p-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-montserrat font-semibold text-neutral-100">
            {message.author}
          </span>
          <p className="text-sm font-montserrat text-neutral-100">
            {message.content}
          </p>
          <span className="text-xs font-montserrat text-neutral-100/70 text-right mt-1">
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
}

function AiSuggestionMessage({
  message,
  isLastMessage,
  onActionClick,
}: {
  message: ChatMessage;
  isLastMessage: boolean;
  onActionClick?: (action: ChatAction) => void;
}) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[70%] flex flex-col gap-3">
        <div className={`bg-neutral-100/10 rounded-2xl rounded-br-md p-4`}>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Image src={RobotIcon} alt="Robot" className="w-4 h-4" />
              <span className="text-xs font-montserrat font-semibold text-neutral-100">
                Sugestão da IA
              </span>
            </div>
            {message.isLoading ? (
              <div className="flex flex-col gap-2">
                <div className="h-3 bg-neutral-100/20 rounded-full animate-pulse w-full" />
                <div className="h-3 bg-neutral-100/20 rounded-full animate-pulse w-4/5" />
                <div className="h-3 bg-neutral-100/20 rounded-full animate-pulse w-3/5" />
              </div>
            ) : (
              <p className="text-sm font-montserrat text-neutral-100">
                {message.content}
              </p>
            )}
            {!message.isLoading && (
              <span className="text-xs font-montserrat text-neutral-100/70 text-right">
                {formatTime(message.timestamp)}
              </span>
            )}
          </div>
        </div>
        {message.actions && isLastMessage && message.actions.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {message.actions.map((action) => (
              <button
                key={action.id}
                onClick={() => onActionClick?.(action)}
                className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 text-neutral-100 text-sm font-montserrat font-medium rounded-full transition-colors cursor-pointer"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function AiSuggestionSkeleton() {
  return (
    <div className="flex justify-end min-w-[70%]">
      <div className="max-w-[70%] flex flex-col gap-3">
        <div className="bg-neutral-100/10 rounded-2xl rounded-br-md p-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Image src={RobotIcon} alt="Robot" className="w-4 h-4" />
              <span className="text-xs font-montserrat font-semibold text-neutral-100">
                Sugestão da IA
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-3 bg-neutral-100/20 rounded-full animate-pulse w-full" />
              <div className="h-3 bg-neutral-100/20 rounded-full animate-pulse w-4/5" />
              <div className="h-3 bg-neutral-100/20 rounded-full animate-pulse w-3/5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MessageBubble({
  message,
  isLastMessage,
  onActionClick,
}: MessageBubbleProps) {
  switch (message.type) {
    case "user_message":
      return <IncomingMessage message={message} />;
    case "assistant_message":
      return <AssistantMessage message={message} />;
    case "ai_suggestion":
      return (
        <AiSuggestionMessage
          message={message}
          onActionClick={onActionClick}
          isLastMessage={isLastMessage}
        />
      );
    default:
      return null;
  }
}
