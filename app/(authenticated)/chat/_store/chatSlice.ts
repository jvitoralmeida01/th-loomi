import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ChatMessageResponse,
  ChatMessageType,
} from "@/src/domain/responses/chat";

export interface ChatMessage {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  type: ChatMessageType;
  actions?: ChatAction[];
  isLoading?: boolean;
}

export interface ChatAction {
  id: string;
  label: string;
}

export interface ChatState {
  messages: ChatMessage[];
  isInitialized: boolean;
  isLoadingAiSuggestion: boolean;
}

export interface InitializeChatPayload {
  messages: ChatMessageResponse[];
}

const initialState: ChatState = {
  messages: [],
  isInitialized: false,
  isLoadingAiSuggestion: false,
};

const DEFAULT_AI_SUGGESTION_ACTIONS: ChatAction[] = [
  { id: "send-proposal", label: "Enviar proposta" },
  { id: "make-call", label: "Fazer ligação" },
  { id: "view-history", label: "Ver histórico" },
];

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    initializeChat: (state, action: PayloadAction<InitializeChatPayload>) => {
      state.messages = action.payload.messages.map((msg) => ({
        ...msg,
        actions:
          msg.type === "ai_suggestion"
            ? DEFAULT_AI_SUGGESTION_ACTIONS
            : undefined,
      }));
      state.isInitialized = true;
    },

    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
    },

    addAssistantMessage: (state, action: PayloadAction<string>) => {
      const newMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        author: "Assistente",
        content: action.payload,
        timestamp: new Date().toISOString(),
        type: "assistant_message",
      };
      state.messages.push(newMessage);
    },

    addIncomingMessage: {
      reducer: (state, action: PayloadAction<ChatMessage>) => {
        state.messages.push(action.payload);
      },
      prepare: (author: string, content: string) => ({
        payload: {
          id: `user-${Date.now()}`,
          author,
          content,
          timestamp: new Date().toISOString(),
          type: "user_message" as const,
        },
      }),
    },

    setLoadingAiSuggestion: (state, action: PayloadAction<boolean>) => {
      state.isLoadingAiSuggestion = action.payload;
    },

    addAiSuggestion: (
      state,
      action: PayloadAction<{ content: string; actions?: ChatAction[] }>
    ) => {
      const newMessage: ChatMessage = {
        id: `ai-suggestion-${Date.now()}`,
        author: "Sugestão da IA",
        content: action.payload.content,
        timestamp: new Date().toISOString(),
        type: "ai_suggestion",
        actions: action.payload.actions ?? DEFAULT_AI_SUGGESTION_ACTIONS,
      };
      state.messages.push(newMessage);
      state.isLoadingAiSuggestion = false;
    },

    setLastAiSuggestionLoading: (state) => {
      const lastAiSuggestionIndex = state.messages.findLastIndex(
        (msg) => msg.type === "ai_suggestion"
      );
      if (lastAiSuggestionIndex !== -1) {
        state.messages[lastAiSuggestionIndex] = {
          ...state.messages[lastAiSuggestionIndex],
          isLoading: true,
          actions: undefined,
        };
      }
    },

    replaceLastAiSuggestion: (state, action: PayloadAction<string>) => {
      const lastAiSuggestionIndex = state.messages.findLastIndex(
        (msg) => msg.type === "ai_suggestion"
      );
      if (lastAiSuggestionIndex !== -1) {
        state.messages[lastAiSuggestionIndex] = {
          ...state.messages[lastAiSuggestionIndex],
          content: action.payload,
          actions: undefined,
          isLoading: false,
          timestamp: new Date().toISOString(),
        };
      }
      state.isLoadingAiSuggestion = false;
    },
  },
});

export const {
  initializeChat,
  addMessage,
  addIncomingMessage,
  addAssistantMessage,
  addAiSuggestion,
  setLoadingAiSuggestion,
  setLastAiSuggestionLoading,
  replaceLastAiSuggestion,
} = chatSlice.actions;

export default chatSlice.reducer;
