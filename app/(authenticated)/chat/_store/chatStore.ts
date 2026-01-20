import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      chat: chatReducer,
    },
  });
};

export type ChatStore = ReturnType<typeof makeStore>;
export type ChatRootState = ReturnType<ChatStore["getState"]>;
export type ChatDispatch = ChatStore["dispatch"];
