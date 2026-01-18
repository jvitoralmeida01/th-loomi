import Badge from "./Badge";
import Image from "next/image";
import viewIcon from "@/assets/icons/chevron_right.svg";

interface Ticket {
  id: string;
  priority: "urgent" | "medium" | "low";
  clientName: string;
  clientEmail: string;
  subject: string;
  status: "open" | "in-progress" | "resolved";
  createdAt: string;
  assignee: string;
}

interface TableRowProps {
  ticket: Ticket;
}

export default function TableRow({ ticket }: TableRowProps) {
  const priorityLabels = {
    urgent: "Urgente",
    medium: "Média",
    low: "Baixa",
  };

  const statusLabels = {
    open: "Aberto",
    "in-progress": "Em andamento",
    resolved: "Resolvido",
  };

  return (
    <tr className="border-b border-glass-edge bg-neutral-100/5 hover:bg-neutral-100/10 transition-colors">
      <td className="px-6 py-4 text-sm text-neutral-100">{ticket.id}</td>
      <td className="px-6 py-4">
        <Badge variant={ticket.priority} label={priorityLabels[ticket.priority]} />
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="text-sm text-neutral-100">{ticket.clientName}</span>
          <span className="text-xs text-neutral-400">{ticket.clientEmail}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-neutral-100">{ticket.subject}</td>
      <td className="px-6 py-4">
        <Badge variant={ticket.status} label={statusLabels[ticket.status]} />
      </td>
      <td className="px-6 py-4 text-sm text-neutral-300">{ticket.createdAt}</td>
      <td className="px-6 py-4 text-sm text-neutral-100">{ticket.assignee}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex items-center gap-1 text-sm text-neutral-300 hover:text-neutral-100 transition-colors"
            aria-label="Editar"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.3333 2.00001C11.5084 1.8249 11.7163 1.68697 11.9441 1.59527C12.1719 1.50357 12.4148 1.46002 12.66 1.46734C12.9052 1.47466 13.1455 1.53271 13.3666 1.63789C13.5877 1.74307 13.7849 1.89314 13.9467 2.07868C14.1084 2.26422 14.2311 2.48122 14.3076 2.71562C14.3841 2.95002 14.4126 3.19718 14.3911 3.44201C14.3696 3.68684 14.2986 3.92412 14.1825 4.13868C14.0664 4.35324 13.908 4.54022 13.7167 4.68668L6.05 12.3533L2.66667 13.3333L3.64667 9.95001L11.3133 2.28334L11.3333 2.00001Z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Editar</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-1 text-sm text-neutral-300 hover:text-neutral-100 transition-colors"
            aria-label="Ver"
          >
            <span>Ver</span>
            <Image src={viewIcon} alt="Ver" width={16} height={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

