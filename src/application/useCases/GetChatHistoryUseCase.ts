import { inject, injectable } from "tsyringe";
import { INortusRepository } from "../repositories.interface/INortusRepository";
import { GetChatHistoryResponse } from "@/src/domain/responses/chat";

export interface GetChatHistoryInput {}

export type GetChatHistoryOutput = GetChatHistoryResponse;

@injectable()
export class GetChatHistoryUseCase {
  constructor(
    @inject(INortusRepository)
    private readonly nortusRepository: INortusRepository
  ) {}

  async execute(_: GetChatHistoryInput): Promise<GetChatHistoryOutput> {
    const chatHistoryResponse = await this.nortusRepository.getChatHistory();
    return chatHistoryResponse as GetChatHistoryOutput;
  }
}
