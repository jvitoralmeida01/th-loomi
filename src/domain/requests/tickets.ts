import { TicketPriority, TicketStatus } from "../entities/tickets";

export interface CreateTicketRequest {
  ticketId: string;
  priority: TicketPriority;
  client: string;
  email: string;
  subject: string;
  status: "Aberto";
  responsible: string;
}

export interface UpdateTicketRequest {
  priority?: TicketPriority;
  client?: string;
  email?: string;
  subject?: string;
  status?: TicketStatus;
  responsible?: string;
}
