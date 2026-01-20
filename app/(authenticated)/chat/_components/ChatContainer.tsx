"use client";

import { useRef, useCallback } from "react";
import Card from "@/app/_components/Card";
import ChatMessages from "./ChatMessages";
import ChatInput, {
  PROPOSAL_SENT_MESSAGES,
  getRandomDelay,
  getRandomReply,
} from "./ChatInput";
import {
  ChatAction,
  setLastAiSuggestionLoading,
  replaceLastAiSuggestion,
} from "../_store/chatSlice";
import { useChatDispatch } from "../_store/hooks";

export default function ChatContainer() {
  const dispatch = useChatDispatch();
  const proposalTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleActionClick = useCallback(
    (action: ChatAction) => {
      if (action.id === "send-proposal") {
        // Clear any existing timeout
        if (proposalTimeoutRef.current) {
          clearTimeout(proposalTimeoutRef.current);
        }

        // Replace the AI suggestion with skeleton loading state
        dispatch(setLastAiSuggestionLoading());

        // After delay, replace the AI suggestion with confirmation
        const delay = getRandomDelay();
        proposalTimeoutRef.current = setTimeout(() => {
          dispatch(
            replaceLastAiSuggestion(getRandomReply(PROPOSAL_SENT_MESSAGES))
          );
        }, delay);
      }
    },
    [dispatch]
  );

  return (
    <div className="flex flex-col gap-3">
      <Card className="flex flex-col max-h-[calc(85vh-8rem)]">
        <ChatMessages onActionClick={handleActionClick} />
      </Card>
      <div className="lg:px-24 px-8">
        <ChatInput />
      </div>
    </div>
  );
}
