"use server";

import routes from "@/app/_utils/routes";
import { redirect } from "next/navigation";
import { container } from "@/di/container";
import { Ticket, TicketPriority, TicketPriorityValues, TicketStatus } from "@/src/domain/entities/tickets";
import { TicketManagementService } from "@/src/application/services/TicketManagementService";
import { GetAllTicketsInput, GetAllTicketsOutput } from "@/src/application/useCases/GetAllTicketsUseCase";
import { GetAllAssigneesOutput } from "@/src/application/useCases/GetAllAssigneesUseCase";
import { GetInfoCardsDataOutput } from "@/src/application/useCases/GetInfoCardsDataUseCase";

export async function getTickets(params: Readonly<GetAllTicketsInput>): Promise<GetAllTicketsOutput> {
  const ticketManagementService = container.resolve(TicketManagementService);
  return await ticketManagementService.getAllTickets(params);
};

export async function getAllAssignees(): Promise<GetAllAssigneesOutput> {
  const ticketManagementService = container.resolve(TicketManagementService);
  return await ticketManagementService.getAllAssignees();
};

export async function getInfoCardsData(): Promise<GetInfoCardsDataOutput> {
  const ticketManagementService = container.resolve(TicketManagementService);
  return await ticketManagementService.getInfoCardsData();
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

  const randomTicketId = `TK${Math.floor(1000 + Math.random() * 9000)}`;

  if (!TicketPriorityValues.includes(priority as TicketPriority)) {
    throw new Error("Prioridade inválida");
  }

  const newTicket: Partial<Ticket> = {
    id: randomTicketId,
    priority: priority as TicketPriority,
    clientName: clientName.trim(),
    clientEmail: email.trim(),
    subject: subject.trim(),
    status: "Aberto",
    assignee: assignee.trim(),
  };

  const errorFeedback: NewTicketFeedbackType = "error";
  const feedbackType: NewTicketFeedbackType = "success";

  redirect(`${routes.ticketManagement}?newTicketFeedback=${feedbackType}`);
}

export async function cancelTicketCreation() {
  redirect(routes.ticketManagement);
}
