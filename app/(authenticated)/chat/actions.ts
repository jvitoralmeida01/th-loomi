import { container } from "@/di/container";
import { ChatService } from "@/src/application/services/ChatService";
import { GetChatHistoryOutput } from "@/src/application/useCases/GetChatHistoryUseCase";

export async function getChatHistory(): Promise<GetChatHistoryOutput> {
  try {
    const chatService = container.resolve(ChatService);
    return await chatService.getChatHistory({});
  } catch {
    return { messages: [] };
  }
}
