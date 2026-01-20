import { injectable, inject } from "tsyringe";
import { INortusRepository } from "@/src/application/repositories.interface/INortusRepository";
import {
  Ticket,
  TicketPriority,
  TicketStatus,
} from "@/src/domain/entities/tickets";
import { GetTicketByIdResponse } from "@/src/domain/responses/tickets";

export interface GetTicketByIdInput {
  ticketId: string;
}

export interface GetTicketByIdOutput {
  ticket: Ticket | null;
  success: boolean;
  error?: string;
}

@injectable()
export class GetTicketByIdUseCase {
  constructor(
    @inject(INortusRepository)
    private readonly nortusRepository: INortusRepository
  ) {}

  async execute(input: GetTicketByIdInput): Promise<GetTicketByIdOutput> {
    const { ticketId } = input;

    if (!this._validateTicketId(ticketId)) {
      return {
        ticket: null,
        success: false,
        error: "ID do ticket inválido",
      };
    }

    try {
      const ticketResponse =
        await this.nortusRepository.getTicketById(ticketId);
      const ticket = this._mapToDomain(ticketResponse);

      return {
        ticket,
        success: true,
      };
    } catch (error) {
      return {
        ticket: null,
        success: false,
        error: "Ticket não encontrado",
      };
    }
  }

  _validateTicketId(ticketId: string): boolean {
    return Boolean(ticketId && ticketId.trim().length > 0);
  }

  _mapToDomain(response: GetTicketByIdResponse): Ticket {
    return {
      _uuid: response.id,
      id: response.ticketId,
      priority: response.priority as TicketPriority,
      clientName: response.client,
      clientEmail: response.email,
      subject: response.subject,
      status: response.status as TicketStatus,
      assignee: response.responsible,
      createdAt: new Date(response.createdAt).toLocaleDateString(),
    };
  }
}
