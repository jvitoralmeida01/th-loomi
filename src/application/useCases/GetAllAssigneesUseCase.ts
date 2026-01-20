import { injectable, inject } from "tsyringe";
import { INortusRepository } from "@/src/application/repositories.interface/INortusRepository";
import { TicketResponse } from "@/src/domain/responses/tickets";

export interface GetAllAssigneesInput {}

export interface GetAllAssigneesOutput {
  assignees: string[];
}

@injectable()
export class GetAllAssigneesUseCase {
  constructor(
    @inject(INortusRepository)
    private readonly nortusRepository: INortusRepository
  ) {}

  async execute(_: GetAllAssigneesInput): Promise<GetAllAssigneesOutput> {
    const allTicketsResponse = await this.nortusRepository.getAllTickets();
    const assignees = this._extractAssignees(allTicketsResponse.data);

    return { assignees };
  }

  _extractAssignees(tickets: TicketResponse[]): string[] {
    return [
      ...new Set(tickets.map((ticket) => ticket.responsible))
    ].sort((a, b) => a.localeCompare(b));
  }
}
