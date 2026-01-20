import { injectable, inject } from "tsyringe";
import { INortusRepository } from "@/src/application/repositories.interface/INortusRepository";
import { TicketPriority, TicketPriorityValues } from "@/src/domain/entities/tickets";
import { CreateTicketRequest } from "@/src/domain/requests/tickets";

export interface CreateTicketInput {
  clientName: string;
  email: string;
  priority: string;
  assignee: string;
  subject: string;
}

export interface CreateTicketOutput {
  success: boolean;
}

@injectable()
export class CreateTicketUseCase {
  constructor(
    @inject(INortusRepository)
    private readonly nortusRepository: INortusRepository
  ) {}

  async execute(input: CreateTicketInput): Promise<CreateTicketOutput> {
    const { clientName, email, priority, assignee, subject } = input;

    this._validateInput(input);

    const randomTicketId = this._generateTicketId();

    const newTicket: CreateTicketRequest = {
      ticketId: randomTicketId,
      priority: priority as TicketPriority,
      client: clientName.trim(),
      email: email.trim(),
      subject: subject.trim(),
      status: "Aberto",
      responsible: assignee.trim(),
    };

    try {
      await this.nortusRepository.createTicket(newTicket);
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  }

  _validateInput(input: CreateTicketInput) {
    const { clientName, email, priority, assignee, subject } = input;

    if (!clientName || !email || !priority || !assignee || !subject) {
      throw new Error("Todos os campos são obrigatórios");
    }

    if (!TicketPriorityValues.includes(priority as TicketPriority)) {
      throw new Error("Prioridade inválida");
    }
  }

  _generateTicketId(): string {
    return `TK${Math.floor(1000 + Math.random() * 9000)}`;
  }
}
