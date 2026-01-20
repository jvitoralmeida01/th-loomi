import { injectable, inject } from "tsyringe";
import { INortusRepository } from "@/src/application/repositories.interface/INortusRepository";
import {
  TicketPriority,
  TicketPriorityValues,
  TicketStatus,
  TicketStatusValues,
} from "@/src/domain/entities/tickets";
import { UpdateTicketRequest } from "@/src/domain/requests/tickets";

export interface UpdateTicketInput {
  uuid: string;
  clientName?: string;
  email?: string;
  priority?: string;
  assignee?: string;
  subject?: string;
  status?: string;
}

export interface UpdateTicketOutput {
  success: boolean;
  error?: string;
}

@injectable()
export class UpdateTicketUseCase {
  constructor(
    @inject(INortusRepository)
    private readonly nortusRepository: INortusRepository
  ) {}

  async execute(input: UpdateTicketInput): Promise<UpdateTicketOutput> {
    const { uuid, clientName, email, priority, assignee, subject, status } =
      input;

    const validationError = this._validateInput(input);
    if (validationError) {
      return { success: false, error: validationError };
    }

    const updateRequest = this._buildUpdateRequest({
      clientName,
      email,
      priority,
      assignee,
      subject,
      status,
    });

    if (Object.keys(updateRequest).length === 0) {
      return { success: false, error: "Nenhum campo para atualizar" };
    }

    try {
      await this.nortusRepository.updateTicket(uuid, updateRequest);
      return { success: true };
    } catch (error) {
      return { success: false, error: "Erro ao atualizar ticket" };
    }
  }

  _validateInput(input: UpdateTicketInput): string | null {
    const { uuid, priority, status } = input;

    if (!uuid || !uuid.trim()) {
      return "ID do ticket é obrigatório";
    }

    if (
      priority &&
      !TicketPriorityValues.includes(priority as TicketPriority)
    ) {
      return "Prioridade inválida";
    }

    if (status && !TicketStatusValues.includes(status as TicketStatus)) {
      return "Status inválido";
    }

    return null;
  }

  _buildUpdateRequest(
    fields: Omit<UpdateTicketInput, "uuid">
  ): UpdateTicketRequest {
    const request: UpdateTicketRequest = {};

    if (fields.clientName?.trim()) {
      request.client = fields.clientName.trim();
    }

    if (fields.email?.trim()) {
      request.email = fields.email.trim();
    }

    if (fields.priority) {
      request.priority = fields.priority as TicketPriority;
    }

    if (fields.assignee?.trim()) {
      request.responsible = fields.assignee.trim();
    }

    if (fields.subject?.trim()) {
      request.subject = fields.subject.trim();
    }

    if (fields.status) {
      request.status = fields.status as TicketStatus;
    }

    return request;
  }
}
