import { injectable } from "tsyringe";
import { INortusRepository } from "@/src/application/repositories.interface/INortusRepository";
import { GetAllTicketsResponse } from "@/src/domain/responses/tickets";

export const TICKETS_CACHE_TAG = "tickets";

@injectable()
export class HttpNortusRepository implements INortusRepository {
  private readonly apiBaseUrl: string;
  private readonly authToken: string;
  private readonly headers: Record<string, string>;

  constructor() {
    this.apiBaseUrl = process.env.API_BASE_URL || "";
    this.authToken = `Bearer ...`;
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
}

