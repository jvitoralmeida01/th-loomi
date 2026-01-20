import { container } from "@/di/container";
import { ChatService } from "@/src/application/services/ChatService";
import { GetChatHistoryOutput } from "@/src/application/useCases/GetChatHistoryUseCase";
import { ChatMessageResponse } from "@/src/domain/responses/chat";

const mockMessages: ChatMessageResponse[] = [
  {
    id: "1",
    author: "Ricardo Leite",
    content: "Oi! Tudo certo? Gostaria de saber sobre o seguro automóvel",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    type: "user_message",
  },
  {
    id: "2",
    author: "Assistente",
    content:
      "Oi, Ricardo! Tudo ótimo e com você? Claro que sim, posso te ajudar com o que precisar. Vi aqui que você tá com a gente há 6 meses com o seguro de automóvel, é isso mesmo?",
    timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
    type: "assistant_message",
  },
  {
    id: "3",
    author: "Ricardo Leite",
    content:
      "Isso! Mas agora fiquei pensando... tem alguma coisa além disso? Tipo, pros meus equipamentos",
    timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
    type: "user_message",
  },
  {
    id: "4",
    author: "Sugestão da IA",
    content:
      "Baseado no perfil do cliente, recomendo a oferta Premium com desconto de 15%. Cliente tem histórico positivo.",
    timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    type: "ai_suggestion",
  },
];

export async function getChatHistory(): Promise<GetChatHistoryOutput> {
  try {
    const chatService = container.resolve(ChatService);
    return await chatService.getChatHistory({});
  } catch {
    return { messages: [] };
  }
}
