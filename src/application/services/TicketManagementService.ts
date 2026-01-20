import { injectable, inject } from "tsyringe";
import { GetAllTicketsUseCase, GetAllTicketsInput, GetAllTicketsOutput } from "@/src/application/useCases/GetAllTicketsUseCase";
import { GetAllAssigneesOutput, GetAllAssigneesUseCase } from "../useCases/GetAllAssigneesUseCase";
import { GetInfoCardsDataOutput, GetInfoCardsDataUseCase } from "../useCases/GetInfoCardsDataUseCase";
import { CreateTicketInput, CreateTicketOutput, CreateTicketUseCase } from "../useCases/CreateTicketUseCase";
import { GetTicketByIdInput, GetTicketByIdOutput, GetTicketByIdUseCase } from "../useCases/GetTicketByIdUseCase";
import { UpdateTicketInput, UpdateTicketOutput, UpdateTicketUseCase } from "../useCases/UpdateTicketUseCase";

@injectable()
export class TicketManagementService {
  constructor(
    @inject(GetAllTicketsUseCase)
    private readonly getAllTicketsUseCase: GetAllTicketsUseCase,
    @inject(GetAllAssigneesUseCase)
    private readonly getAllAssigneesUseCase: GetAllAssigneesUseCase,
    @inject(GetInfoCardsDataUseCase)
    private readonly getInfoCardsDataUseCase: GetInfoCardsDataUseCase,
    @inject(CreateTicketUseCase)
    private readonly createTicketUseCase: CreateTicketUseCase,
    @inject(GetTicketByIdUseCase)
    private readonly getTicketByIdUseCase: GetTicketByIdUseCase,
    @inject(UpdateTicketUseCase)
    private readonly updateTicketUseCase: UpdateTicketUseCase,
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

  async createTicket(input: CreateTicketInput): Promise<CreateTicketOutput> {
    return await this.createTicketUseCase.execute(input);
  }

  async getTicketById(input: GetTicketByIdInput): Promise<GetTicketByIdOutput> {
    return await this.getTicketByIdUseCase.execute(input);
  }

  async updateTicket(input: UpdateTicketInput): Promise<UpdateTicketOutput> {
    return await this.updateTicketUseCase.execute(input);
  }
}

