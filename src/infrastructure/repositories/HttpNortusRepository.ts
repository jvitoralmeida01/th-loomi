import { injectable } from "tsyringe";
import { INortusRepository } from "@/src/application/repositories.interface/INortusRepository";
import { GetAllTicketsResponse } from "@/src/domain/responses/tickets";
import { Ticket } from "@/src/domain/entities/tickets";
import { revalidateTicketsCache } from "../utils/revalidateTickets";
import { CreateTicketRequest } from "@/src/domain/requests/tickets";

export const TICKETS_CACHE_TAG = "tickets";

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
}

