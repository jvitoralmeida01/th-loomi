import Badge from "../../../_components/Badge";
import Image from "next/image";
import editIcon from "@/assets/icons/edit.svg";
import goToIcon from "@/assets/icons/go_to.svg";
import { Ticket } from "@/src/domain/entities/tickets";
import Link from "next/link";
import routes from "@/app/_utils/routes";

interface TableRowProps {
  ticket: Ticket;
  isLastRow?: boolean;
}

export default function TableRow({ ticket, isLastRow = false }: TableRowProps) {
  const editUrl = `${routes.ticketManagement}?editTicket=${ticket._uuid}`;

  return (
    <tr className={`border-b border-glass-edge hover:bg-neutral-100/10 transition-colors ${isLastRow ? "border-b-0" : "border-b"}`}>
      <td
        className="px-2 py-6 font-montserrat font-semibold text-xs text-neutral-100 overflow-hidden text-ellipsis"
        title={ticket.id}
      >
        {ticket.id}
      </td>
      <td
        className="px-2 py-2"
        title={ticket.priority}
      >
        <Badge variant={ticket.priority} label={ticket.priority} />
      </td>
      <td className="px-2 py-2" title={`${ticket.clientName} - ${ticket.clientEmail}`}>
        <div className="flex flex-col">
          <span className="font-montserrat font-semibold text-xs text-neutral-100 overflow-hidden text-ellipsis">{ticket.clientName}</span>
          <span className="font-montserrat font-normal text-xs text-neutral-100 overflow-hidden text-ellipsis">{ticket.clientEmail}</span>
        </div>
      </td>
      <td
        className="px-2 py-2 font-montserrat font-semibold text-xs text-neutral-100 overflow-hidden text-ellipsis"
        title={ticket.subject}
      >
        {ticket.subject}
      </td>
      <td className="px-2 py-2" title={ticket.status}>
        <Badge variant={ticket.status} label={ticket.status} />
      </td>
      <td
        className="px-2 py-2 font-montserrat font-semibold text-xs text-neutral-100 overflow-hidden text-ellipsis"
        title={ticket.createdAt}
      >
        {ticket.createdAt}
      </td>
      <td className="px-2 py-2 font-montserrat font-semibold text-xs text-neutral-100" title={ticket.assignee}>
        <span className="line-clamp-3">
          {ticket.assignee}
        </span>
      </td>
      <td className="px-2 py-2">
        <div className="flex items-center gap-4">
          <Link
            href={editUrl}
            className="flex items-center gap-2 text-xs text-neutral-300 hover:text-neutral-100 transition-colors"
            aria-label="Editar"
            title="Editar"
          >
            <span>Editar</span>
            <Image src={editIcon} alt="Editar" className="w-4 h-4" />
          </Link>
          <button
            type="button"
            className="flex items-center gap-2 text-xs text-neutral-300 hover:text-neutral-100 transition-colors"
            aria-label="Ver"
            title="Ver"
          >
            <span>Ver</span>
            <Image src={goToIcon} alt="Ver" className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}

