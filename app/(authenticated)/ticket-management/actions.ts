"use server";

import routes from "@/app/_utils/routes";
import { redirect } from "next/navigation";
import { container } from "@/di/container";
import { Ticket, TicketPriority, TicketPriorityValues } from "@/src/domain/entities/tickets";
import { TicketManagementService } from "@/src/application/services/TicketManagementService";
import { GetAllTicketsInput, GetAllTicketsOutput } from "@/src/application/useCases/GetAllTicketsUseCase";
import { GetAllAssigneesOutput } from "@/src/application/useCases/GetAllAssigneesUseCase";
import { GetInfoCardsDataOutput } from "@/src/application/useCases/GetInfoCardsDataUseCase";
import { CreateTicketInput, CreateTicketOutput } from "@/src/application/useCases/CreateTicketUseCase";

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

export type NewTicketFeedbackType = "success" | "error";

export async function createTicket(formData: FormData) {
  const newTicket: CreateTicketInput = {
    clientName: formData.get("clientName") as string,
    email: formData.get("email") as string,
    priority: formData.get("priority") as string,
    assignee: formData.get("assignee") as string,
    subject: formData.get("subject") as string,
  };

  const ticketManagementService = container.resolve(TicketManagementService);
  const createTicketOutput = await ticketManagementService.createTicket(newTicket);

  if (createTicketOutput.success) {
    redirect(`${routes.ticketManagement}?newTicketFeedback=success`);
  } else {
    redirect(`${routes.ticketManagement}?newTicketFeedback=error`);
  }
}

export async function cancelTicketCreation() {
  redirect(routes.ticketManagement);
}
