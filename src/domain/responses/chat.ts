export type ChatMessageType =
  | "user_message"
  | "assistant_message"
  | "ai_suggestion";

export interface GetChatHistoryResponse {
  messages: ChatMessageResponse[];
}

export interface ChatMessageResponse {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  type: ChatMessageType;
}
