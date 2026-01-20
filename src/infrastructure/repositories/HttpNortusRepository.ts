import { injectable } from "tsyringe";
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
import { LoginRequest } from "@/src/domain/requests/auth";
import {
  GetUserByEmailResponse,
  LoginResponse,
} from "@/src/domain/responses/auth";

export const TICKETS_CACHE_TAG = "tickets";
export const DASHBOARD_CACHE_TAG = "dashboard";
export const MAP_LOCATIONS_CACHE_TAG = "map-locations";

@injectable()
export class HttpNortusRepository implements INortusRepository {
  private readonly apiBaseUrl: string;
  private readonly authToken: string;
  private readonly headers: Record<string, string>;

  constructor() {
    this.apiBaseUrl = process.env.API_BASE_URL || "";
    this.authToken = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGFlMDBjLWFiOTgtNGJiMS05MjdmLWYyMzVlN2FjZDZiZiIsImNoYWxsZW5nZUxldmVsIjoyLCJyZWZyZXNoX3Rva2VuIjp7ImlkIjoiM2QzODA5NTEtZTk5Yi00NzcwLTlkYjctZGM4MzIzMmQ4NjE1IiwiZWF0IjoiMjAyNi0wMi0xOVQwMDoxNjoyNi44NzhaIn0sImlhdCI6MTc2ODg2ODE4NiwiZXhwIjoxODU1MjY4MTg2fQ.dEAldDmFKUtxzqprwgb7vGno3salrVjO5Q7u0YVvjpY`;
    this.headers = {
      "Content-Type": "application/json",
      Authorization: this.authToken,
    };

    if (!this.apiBaseUrl) {
      throw new Error("API_BASE_URL environment variable is not set");
    }
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
        headers: this.headers,
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
      headers: this.headers,
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
      headers: this.headers,
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
      headers: this.headers,
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
      headers: this.headers,
      body: JSON.stringify(ticket),
    });

    if (!response.ok) {
      const e = new Error(
        `Failed to update ticket: ${response.status} - ${response.statusText}`
      );
      console.error("Error: ", ticketId, ticket, e);
      throw e;
    }

    revalidateTicketsCache({ eagerly: true });
  }

  async getDashboardData(): Promise<GetDashboardResponse> {
    const response = await fetch(`${this.apiBaseUrl}/nortus-v1/dashboard`, {
      method: "GET",
      headers: this.headers,
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
      headers: this.headers,
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
}
