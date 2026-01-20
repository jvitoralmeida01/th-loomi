"use server";

import routes from "@/app/_utils/routes";
import { redirect } from "next/navigation";
import { container } from "@/di/container";
import { TicketManagementService } from "@/src/application/services/TicketManagementService";
import { GetAllTicketsInput, GetAllTicketsOutput } from "@/src/application/useCases/GetAllTicketsUseCase";
import { GetAllAssigneesOutput } from "@/src/application/useCases/GetAllAssigneesUseCase";
import { GetInfoCardsDataOutput } from "@/src/application/useCases/GetInfoCardsDataUseCase";
import { CreateTicketInput } from "@/src/application/useCases/CreateTicketUseCase";
import { GetTicketByIdOutput } from "@/src/application/useCases/GetTicketByIdUseCase";
import { UpdateTicketInput } from "@/src/application/useCases/UpdateTicketUseCase";

export type FeedbackType = "success" | "error";

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

export async function getTicketById(ticketId: string): Promise<GetTicketByIdOutput> {
  const ticketManagementService = container.resolve(TicketManagementService);
  return await ticketManagementService.getTicketById({ ticketId });
}

export async function updateTicket(formData: FormData) {
  const updateData: UpdateTicketInput = {
    uuid: formData.get("uuid") as string,
    clientName: formData.get("clientName") as string,
    email: formData.get("email") as string,
    priority: formData.get("priority") as string,
    assignee: formData.get("assignee") as string,
    subject: formData.get("subject") as string,
    status: formData.get("status") as string,
  };

  const ticketManagementService = container.resolve(TicketManagementService);
  const updateTicketOutput = await ticketManagementService.updateTicket(updateData);

  if (updateTicketOutput.success) {
    redirect(`${routes.ticketManagement}?editTicketFeedback=success`);
  } else {
    redirect(`${routes.ticketManagement}?editTicketFeedback=error`);
  }
}

export async function cancelTicketEdit() {
  redirect(routes.ticketManagement);
}
