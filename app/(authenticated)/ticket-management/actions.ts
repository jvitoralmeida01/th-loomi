"use server";

import { mockTickets } from "./_utils/mock";

export type Ticket = typeof mockTickets[0];

export interface GetTicketsParams {
  query?: string;
  status?: string;
  priority?: string;
  assignee?: string;
  page?: number;
  itemsPerPage?: number;
}

export interface GetTicketsResult {
  tickets: Ticket[];
  total: number;
  totalPages: number;
  currentPage: number;
}

/**
 * Server action to fetch tickets with filtering and pagination
 *
 * TODO: Replace this mock implementation with actual API call
 * Example:
 *   const response = await fetch(`${API_URL}/tickets?query=${query}&page=${page}&limit=${itemsPerPage}`);
 *   return await response.json();
 */
export async function getTickets({
  query = "",
  status,
  priority,
  assignee,
  page = 1,
  itemsPerPage = 5,
}: Readonly<GetTicketsParams>): Promise<GetTicketsResult> {
  const normalizedQuery = query.trim();
  const hasFilters = status || priority || assignee;

  const filteredTickets = mockTickets.filter((ticket) => {
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

  const total = filteredTickets.length;
  const totalPages = Math.max(1, Math.ceil(total / itemsPerPage));
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTickets = filteredTickets.slice(startIndex, endIndex);

  return {
    tickets: paginatedTickets,
    total,
    totalPages,
    currentPage,
  };
};
