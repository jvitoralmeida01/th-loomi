import { injectable } from "tsyringe";
import { cookies } from "next/headers";
import { INortusRepository } from "@/src/application/repositories.interface/INortusRepository";
import {
  GetAllTicketsResponse,
  GetTicketByIdResponse,
} from "@/src/domain/responses/tickets";
import { revalidateTicketsCache } from "../utils/revalidateTickets";
import {
  CreateTicketRequest,
  UpdateTicketRequest,
} from "@/src/domain/requests/tickets";
import { GetDashboardResponse } from "@/src/domain/responses/dashboard";
import { GetMapLocationsResponse } from "@/src/domain/responses/GetMapLocationsResponse";
import { PlanSimulatorDataResponse } from "@/src/domain/responses/planSimulator";
import { LoginRequest } from "@/src/domain/requests/auth";
import {
  GetUserByEmailResponse,
  LoginResponse,
} from "@/src/domain/responses/auth";
import { GetChatHistoryResponse } from "@/src/domain/responses/chat";
import { AUTH_TOKEN_COOKIE } from "@/src/application/services/AuthService";

export const TICKETS_CACHE_TAG = "tickets";
export const DASHBOARD_CACHE_TAG = "dashboard";
export const MAP_LOCATIONS_CACHE_TAG = "map-locations";
export const PLAN_SIMULATOR_CACHE_TAG = "plan-simulator";

@injectable()
export class HttpNortusRepository implements INortusRepository {
  private readonly apiBaseUrl: string;

  constructor() {
    this.apiBaseUrl = process.env.API_BASE_URL || "";

    if (!this.apiBaseUrl) {
      throw new Error("API_BASE_URL environment variable is not set");
    }
  }

  private async getAuthHeaders(): Promise<Record<string, string>> {
    const cookieStore = await cookies();
    const authToken = cookieStore.get(AUTH_TOKEN_COOKIE)?.value;

    return {
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    };
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${this.apiBaseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to login: ${response.status} - ${response.statusText}`
      );
    }

    return response.json();
  }

  async getUserByEmail(email: string): Promise<GetUserByEmailResponse> {
    const response = await fetch(
      `${this.apiBaseUrl}/users/by-email/${encodeURIComponent(email)}`,
      {
        method: "GET",
        headers: await this.getAuthHeaders(),
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch user by email: ${response.status} - ${response.statusText}`
      );
    }

    return response.json();
  }

  async getAllTickets(): Promise<GetAllTicketsResponse> {
    const response = await fetch(`${this.apiBaseUrl}/tickets`, {
      method: "GET",
      headers: await this.getAuthHeaders(),
      next: {
        revalidate: 300,
        tags: [TICKETS_CACHE_TAG],
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch tickets: ${response.status} - ${response.statusText}`
      );
    }

    return response.json();
  }

  async getTicketById(ticketId: string): Promise<GetTicketByIdResponse> {
    const response = await fetch(`${this.apiBaseUrl}/tickets/${ticketId}`, {
      method: "GET",
      headers: await this.getAuthHeaders(),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch ticket: ${response.status} - ${response.statusText}`
      );
    }

    return response.json();
  }

  async createTicket(ticket: CreateTicketRequest): Promise<void> {
    const response = await fetch(`${this.apiBaseUrl}/tickets`, {
      method: "POST",
      headers: await this.getAuthHeaders(),
      body: JSON.stringify(ticket),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to create ticket: ${response.status} - ${response.statusText}`
      );
    }

    revalidateTicketsCache({ eagerly: true });
  }

  async updateTicket(
    ticketId: string,
    ticket: UpdateTicketRequest
  ): Promise<void> {
    const response = await fetch(`${this.apiBaseUrl}/tickets/${ticketId}`, {
      method: "PATCH",
      headers: await this.getAuthHeaders(),
      body: JSON.stringify(ticket),
    });

    if (!response.ok) {
      const e = new Error(
        `Failed to update ticket: ${response.status} - ${response.statusText}`
      );

      throw e;
    }

    revalidateTicketsCache({ eagerly: true });
  }

  async getDashboardData(): Promise<GetDashboardResponse> {
    const response = await fetch(`${this.apiBaseUrl}/nortus-v1/dashboard`, {
      method: "GET",
      headers: await this.getAuthHeaders(),
      next: {
        revalidate: 120,
        tags: [DASHBOARD_CACHE_TAG],
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch dashboard data: ${response.status} - ${response.statusText}`
      );
    }

    return response.json();
  }

  async getMapLocations(): Promise<GetMapLocationsResponse> {
    const response = await fetch(`${this.apiBaseUrl}/map/locations`, {
      method: "GET",
      headers: await this.getAuthHeaders(),
      next: {
        revalidate: 120,
        tags: [MAP_LOCATIONS_CACHE_TAG],
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch map locations: ${response.status} - ${response.statusText}`
      );
    }

    return response.json();
  }

  async getPlanSimulatorData(): Promise<PlanSimulatorDataResponse> {
    const response = await fetch(
      `${this.apiBaseUrl}/nortus-v1/simulador-planos`,
      {
        method: "GET",
        headers: await this.getAuthHeaders(),
        next: {
          revalidate: 120,
          tags: [PLAN_SIMULATOR_CACHE_TAG],
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch plan simulator data: ${response.status} - ${response.statusText}`
      );
    }

    return response.json();
  }

  async getChatHistory(): Promise<GetChatHistoryResponse> {
    const response = await fetch(`${this.apiBaseUrl}/nortus-v1/chat/`, {
      method: "GET",
      headers: await this.getAuthHeaders(),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch chat history: ${response.status} - ${response.statusText}`
      );
    }

    return response.json();
  }
}
