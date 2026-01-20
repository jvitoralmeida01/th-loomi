import {
  CreateTicketRequest,
  UpdateTicketRequest,
} from "@/src/domain/requests/tickets";
import { GetDashboardResponse } from "@/src/domain/responses/dashboard";
import { GetMapLocationsResponse } from "@/src/domain/responses/GetMapLocationsResponse";
import {
  GetAllTicketsResponse,
  GetTicketByIdResponse,
} from "@/src/domain/responses/tickets";

export const INortusRepository = Symbol("INortusRepository");

export interface INortusRepository {
  // Ticket Management
  getAllTickets(): Promise<GetAllTicketsResponse>;
  getTicketById(ticketId: string): Promise<GetTicketByIdResponse>;
  createTicket(ticket: CreateTicketRequest): Promise<void>;
  updateTicket(ticketId: string, ticket: UpdateTicketRequest): Promise<void>;

  // Dashboard
  getDashboardData(): Promise<GetDashboardResponse>;
  getMapLocations(): Promise<GetMapLocationsResponse>;
}
