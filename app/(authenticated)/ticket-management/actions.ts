"use server";

import routes from "@/app/_utils/routes";
import { mockTickets } from "./_utils/mock";
import { redirect } from "next/navigation";

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

export interface CreateTicketParams {
  clientName: string;
  email: string;
  priority: string;
  assignee: string;
  subject: string;
}

export type NewTicketFeedbackType = "success" | "error";

export async function fillTicketParameters(formData: FormData) {
  const clientName = formData.get("clientName") as string;
  const email = formData.get("email") as string;
  const priority = formData.get("priority") as string;
  const assignee = formData.get("assignee") as string;
  const subject = formData.get("subject") as string;

  redirect(`${routes.ticketManagement}?formData=${encodeURIComponent(JSON.stringify({ clientName, email, priority, assignee, subject }))}`);
}

export async function createTicket(params: CreateTicketParams) {
  const { clientName, email, priority, assignee, subject } = params;

  if (!clientName || !email || !priority || !assignee || !subject) {
    throw new Error("Todos os campos são obrigatórios");
  }

  const lastTicketId = mockTickets[mockTickets.length - 1]?.id || "TK000";
  const lastNumber = parseInt(lastTicketId.replace("TK", ""), 10);
  const nextId = `TK${String(lastNumber + 1).padStart(3, "0")}`;

  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const createdAt = `${day}/${month}/${year}`;

  if (!["urgent", "medium", "low"].includes(priority)) {
    throw new Error("Prioridade inválida");
  }

  const newTicket: Ticket = {
    id: nextId,
    priority: priority as "urgent" | "medium" | "low",
    clientName: clientName.trim(),
    clientEmail: email.trim(),
    subject: subject.trim(),
    status: "open" as const,
    createdAt,
    assignee: assignee.trim(),
  } as Ticket;

  const errorFeedback: NewTicketFeedbackType = "error";
  const feedbackType: NewTicketFeedbackType = "success";

  redirect(`${routes.ticketManagement}?newTicketFeedback=${feedbackType}`);
}

export async function cancelTicketCreation() {
  redirect(routes.ticketManagement);
}
