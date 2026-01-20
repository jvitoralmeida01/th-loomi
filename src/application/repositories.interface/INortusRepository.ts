import { LoginRequest } from "@/src/domain/requests/auth";
import {
  CreateTicketRequest,
  UpdateTicketRequest,
} from "@/src/domain/requests/tickets";
import {
  GetUserByEmailResponse,
  LoginResponse,
} from "@/src/domain/responses/auth";
import { GetDashboardResponse } from "@/src/domain/responses/dashboard";
import { GetMapLocationsResponse } from "@/src/domain/responses/GetMapLocationsResponse";
import { PlanSimulatorDataResponse } from "@/src/domain/responses/planSimulator";
import {
  GetAllTicketsResponse,
  GetTicketByIdResponse,
} from "@/src/domain/responses/tickets";

export const INortusRepository = Symbol("INortusRepository");

export interface INortusRepository {
  // Auth
  login(credentials: LoginRequest): Promise<LoginResponse>;
  getUserByEmail(email: string): Promise<GetUserByEmailResponse>;

  // Ticket Management
  getAllTickets(): Promise<GetAllTicketsResponse>;
  getTicketById(ticketId: string): Promise<GetTicketByIdResponse>;
  createTicket(ticket: CreateTicketRequest): Promise<void>;
  updateTicket(ticketId: string, ticket: UpdateTicketRequest): Promise<void>;

  // Dashboard
  getDashboardData(): Promise<GetDashboardResponse>;
  getMapLocations(): Promise<GetMapLocationsResponse>;

  // Plan Simulator
  getPlanSimulatorData(): Promise<PlanSimulatorDataResponse>;
}
