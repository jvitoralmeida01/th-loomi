import { GetAllTicketsResponse } from "@/src/domain/responses/tickets";

export const INortusRepository = Symbol("INortusRepository");

export interface INortusRepository {
  getAllTickets(): Promise<GetAllTicketsResponse>;
}
