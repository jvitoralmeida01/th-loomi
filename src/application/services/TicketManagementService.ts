import { injectable, inject } from "tsyringe";
import { GetAllTicketsUseCase, GetAllTicketsInput, GetAllTicketsOutput } from "@/src/application/useCases/GetAllTicketsUseCase";
import { GetAllAssigneesOutput, GetAllAssigneesUseCase } from "../useCases/GetAllAssigneesUseCase";
import { GetInfoCardsDataOutput, GetInfoCardsDataUseCase } from "../useCases/GetInfoCardsDataUseCase";

@injectable()
export class TicketManagementService {
  constructor(
    @inject(GetAllTicketsUseCase)
    private readonly getAllTicketsUseCase: GetAllTicketsUseCase,
    @inject(GetAllAssigneesUseCase)
    private readonly getAllAssigneesUseCase: GetAllAssigneesUseCase,
    @inject(GetInfoCardsDataUseCase)
    private readonly getInfoCardsDataUseCase: GetInfoCardsDataUseCase,
  ) {}

  async getAllTickets(input: GetAllTicketsInput): Promise<GetAllTicketsOutput> {
    return await this.getAllTicketsUseCase.execute(input);
  }

  async getAllAssignees(): Promise<GetAllAssigneesOutput> {
    return await this.getAllAssigneesUseCase.execute({});
  }

  async getInfoCardsData(): Promise<GetInfoCardsDataOutput> {
    return await this.getInfoCardsDataUseCase.execute({});
  }
}

