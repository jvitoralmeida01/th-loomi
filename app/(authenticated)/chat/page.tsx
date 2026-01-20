import { getChatHistory } from "./actions";
import ChatContainer from "./_components/ChatContainer";
import StoreInitializer from "./_store/StoreInitializer";

export default async function ChatPage() {
  const { messages } = await getChatHistory();

  return (
    <div className="py-8 px-32 max-w-full">
      <StoreInitializer initialData={{ messages }} />
      <ChatContainer />
    </div>
  );
}
