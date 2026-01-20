import { injectable, inject } from "tsyringe";
import {
  GetChatHistoryInput,
  GetChatHistoryOutput,
  GetChatHistoryUseCase,
} from "../useCases/GetChatHistoryUseCase";

@injectable()
export class ChatService {
  constructor(
    @inject(GetChatHistoryUseCase)
    private readonly getChatHistoryUseCase: GetChatHistoryUseCase
  ) {}

  async getChatHistory(
    input: GetChatHistoryInput
  ): Promise<GetChatHistoryOutput> {
    return await this.getChatHistoryUseCase.execute(input);
  }
}
