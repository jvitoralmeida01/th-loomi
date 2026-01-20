import { TicketPriority } from "../entities/tickets";

export interface CreateTicketRequest {
  ticketId: string,
  priority: TicketPriority,
  client: string,
  email: string,
  subject: string,
  status: "Aberto",
  responsible: string,
};
