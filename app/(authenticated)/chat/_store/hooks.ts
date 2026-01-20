import { useDispatch, useSelector, useStore } from "react-redux";
import type { ChatDispatch, ChatStore, ChatRootState } from "./chatStore";

export const useChatDispatch = useDispatch.withTypes<ChatDispatch>();
export const useChatSelector = useSelector.withTypes<ChatRootState>();
export const useChatStore = useStore.withTypes<ChatStore>();
