import { CreateTicketRequest } from "@/src/domain/requests/tickets";
import { GetAllTicketsResponse } from "@/src/domain/responses/tickets";

export const INortusRepository = Symbol("INortusRepository");

export interface INortusRepository {
  getAllTickets(): Promise<GetAllTicketsResponse>;
  createTicket(ticket: CreateTicketRequest): Promise<void>;
}
