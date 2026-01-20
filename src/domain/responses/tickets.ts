export interface TicketResponse {
  id: string;
  ticketId: string;
  priority: string;
  client: string;
  email: string;
  subject: string;
  status: string;
  responsible: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllTicketsResponse {
  data: TicketResponse[];
  total: number;
}

export interface GetTicketByIdResponse {
  id: string;
  ticketId: string;
  priority: string;
  client: string;
  email: string;
  subject: string;
  status: string;
  responsible: string;
  createdAt: string;
  updatedAt: string;
}
