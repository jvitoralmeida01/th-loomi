import { CreateTicketRequest, UpdateTicketRequest } from "@/src/domain/requests/tickets";
import { GetAllTicketsResponse, GetTicketByIdResponse } from "@/src/domain/responses/tickets";

export const INortusRepository = Symbol("INortusRepository");

export interface INortusRepository {
  getAllTickets(): Promise<GetAllTicketsResponse>;
  getTicketById(ticketId: string): Promise<GetTicketByIdResponse>;
  createTicket(ticket: CreateTicketRequest): Promise<void>;
  updateTicket(ticketId: string, ticket: UpdateTicketRequest): Promise<void>;
}
