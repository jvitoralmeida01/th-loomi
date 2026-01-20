export type TicketPriority = "Urgente" | "Média" | "Baixa";
export const TicketPriorityValues: TicketPriority[] = [
  "Urgente",
  "Média",
  "Baixa",
];

export type TicketStatus = "Aberto" | "Em andamento" | "Fechado";
export const TicketStatusValues: TicketStatus[] = [
  "Aberto",
  "Em andamento",
  "Fechado",
];

export interface Ticket {
  _uuid: string;
  id: string;
  priority: TicketPriority;
  clientName: string;
  clientEmail: string;
  subject: string;
  status: TicketStatus;
  assignee: string;
  createdAt: string;
}
