import { injectable, inject } from "tsyringe";
import { INortusRepository } from "@/src/application/repositories.interface/INortusRepository";
import { Ticket, TicketPriority, TicketStatus } from "@/src/domain/entities/tickets";
import { GetAllTicketsResponse } from "@/src/domain/responses/tickets";

export interface GetAllTicketsInput {
  query?: string;
  status?: string;
  priority?: string;
  assignee?: string;
  page?: number;
  itemsPerPage: number;
}

export interface GetAllTicketsOutput {
  tickets: Ticket[];
  total: number;
  totalPages: number;
  currentPage: number;
}

@injectable()
export class GetAllTicketsUseCase {
  constructor(
    @inject(INortusRepository)
    private readonly nortusRepository: INortusRepository
  ) {}

  async execute(input: GetAllTicketsInput): Promise<GetAllTicketsOutput> {
    const allTicketsResponse = await this.nortusRepository.getAllTickets();
    const tickets: Ticket[] = this._mapToDomain(allTicketsResponse);
    const filteredTickets = this._filterTickets(tickets, input);
    const {
      paginatedTickets,
      totalPages,
      currentPage
    } = this._paginateTickets(filteredTickets, input);

    return {
      tickets: paginatedTickets,
      total: filteredTickets.length,
      totalPages,
      currentPage,
    };
  }

  _mapToDomain(response: GetAllTicketsResponse): Ticket[] {
    return response.data.map((ticketResponse) => ({
      _uuid: ticketResponse.id,
      id: ticketResponse.ticketId,
      priority: ticketResponse.priority as TicketPriority,
      clientName: ticketResponse.client,
      clientEmail: ticketResponse.email,
      subject: ticketResponse.subject,
      status: ticketResponse.status as TicketStatus,
      assignee: ticketResponse.responsible,
      createdAt: new Date(ticketResponse.createdAt).toLocaleDateString(),
    }));
  }

  _filterTickets(tickets: Ticket[], input: GetAllTicketsInput): Ticket[] {
    const { query = "", status, priority, assignee } = input;

    const normalizedQuery = query.trim();
    const hasFilters = Boolean(status || priority || assignee);

    const filteredTickets = tickets.filter((ticket) => {
      if (!normalizedQuery && !hasFilters) return true;

      const isQueryMatch = normalizedQuery && (
        ticket.id.toLowerCase().includes(normalizedQuery.toLowerCase())
        || ticket.clientName.toLowerCase().includes(normalizedQuery.toLowerCase())
        || ticket.clientEmail.toLowerCase().includes(normalizedQuery.toLowerCase())
        || ticket.subject.toLowerCase().includes(normalizedQuery.toLowerCase())
      );

      if (normalizedQuery && !hasFilters) return isQueryMatch;

      const isStatusMatch = status ? ticket?.status === status : true;
      const isPriorityMatch = priority ? ticket?.priority === priority : true;
      const isAssigneeMatch = assignee ? ticket?.assignee === assignee : true;

      const filtersMatch = isStatusMatch && isPriorityMatch && isAssigneeMatch;

      if (!normalizedQuery && hasFilters) return filtersMatch;

      return isQueryMatch && filtersMatch;
    });

    return filteredTickets;
  }

  _paginateTickets(tickets: Ticket[], input: GetAllTicketsInput): { paginatedTickets: Ticket[], totalPages: number, currentPage: number } {
    const { page = 1, itemsPerPage } = input;

    const total = tickets.length;
    const totalPages = Math.max(1, Math.ceil(total / itemsPerPage));
    const currentPage = Math.max(1, Math.min(page, totalPages));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedTickets = tickets.slice(startIndex, endIndex);

    return { paginatedTickets, totalPages, currentPage };
  }
}
