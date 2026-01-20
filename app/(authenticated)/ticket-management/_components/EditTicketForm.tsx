import { cancelTicketEdit, updateTicket } from "../actions";
import Image from "next/image";
import CloseOutlinedIcon from "@/assets/icons/close_outlined.svg";
import EditTicketFormCancelButton from "./EditTicketFormCancelButton";
import EditTicketSubmitButton from "./EditTicketSubmitButton";
import ArrowDownIcon from "@/assets/icons/arrow_down.svg";
import {
  Ticket,
  TicketPriorityValues,
  TicketStatusValues,
} from "@/src/domain/entities/tickets";

interface EditTicketFormProps {
  ticket: Ticket;
}

export default function EditTicketForm({
  ticket,
}: Readonly<EditTicketFormProps>) {
  return (
    <div className="bg-background rounded-xl p-6 min-w-lg w-full max-w-2xl">
      <div className="flex flex-col gap-4 items-start justify-between mb-4">
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="text-xl font-space-grotesk tracking-tight font-regular text-neutral-100">
            Editar Ticket
          </h1>
          <form action={cancelTicketEdit}>
            <button
              type="submit"
              className="flex items-center justify-center rounded-full hover:bg-neutral-100/5 text-neutral-200 text-lg font-bold cursor-pointer"
              aria-label="Fechar"
            >
              <Image
                src={CloseOutlinedIcon}
                alt="Close Icon"
                className="w-10 h-10"
              />
            </button>
          </form>
        </div>

        <p className="text-xs text-neutral-100">
          Atualize os dados do ticket abaixo.
        </p>
      </div>

      <form action={updateTicket} className="flex flex-col gap-3">
        <input type="hidden" name="uuid" value={ticket._uuid} />

        <div className="flex flex-col gap-1">
          <label
            htmlFor="clientName"
            className="text-sm font-space-grotesk tracking-tight text-neutral-100 pl-4"
          >
            Nome do cliente
          </label>
          <input
            id="clientName"
            name="clientName"
            type="text"
            required
            defaultValue={ticket.clientName}
            placeholder="Nome da pessoa ou empresa que está solicitando o suporte"
            className="w-full rounded-2xl border border-glass-edge bg-neutral-100/5 px-5 py-4 text-xs text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="text-sm font-space-grotesk tracking-tight text-neutral-100 pl-4"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            defaultValue={ticket.clientEmail}
            placeholder="E-mail de contato para atualizações e resposta"
            className="w-full rounded-2xl border border-glass-edge bg-neutral-100/5 px-5 py-4 text-xs text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex flex-row gap-3">
          <div className="flex flex-col gap-1 flex-1">
            <label
              htmlFor="priority"
              className="text-sm font-space-grotesk tracking-tight text-neutral-100 pl-4"
            >
              Prioridade
            </label>
            <div className="relative">
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <Image
                  src={ArrowDownIcon}
                  alt="Arrow Down Icon"
                  className="w-3 h-3"
                />
              </div>
              <select
                id="priority"
                name="priority"
                required
                defaultValue={ticket.priority}
                className="appearance-none w-full rounded-2xl border border-glass-edge bg-neutral-100/5 px-5 py-4 text-xs text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-primary cursor-pointer"
              >
                {TicketPriorityValues.map((priority) => (
                  <option
                    key={priority}
                    value={priority}
                    className="bg-background"
                  >
                    {priority}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1 flex-1">
            <label
              htmlFor="status"
              className="text-sm font-space-grotesk tracking-tight text-neutral-100 pl-4"
            >
              Status
            </label>
            <div className="relative">
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <Image
                  src={ArrowDownIcon}
                  alt="Arrow Down Icon"
                  className="w-3 h-3"
                />
              </div>
              <select
                id="status"
                name="status"
                required
                defaultValue={ticket.status}
                className="appearance-none w-full rounded-2xl border border-glass-edge bg-neutral-100/5 px-5 py-4 text-xs text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-primary cursor-pointer"
              >
                {TicketStatusValues.map((status) => (
                  <option key={status} value={status} className="bg-background">
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="assignee"
            className="text-sm font-space-grotesk tracking-tight text-neutral-100 pl-4"
          >
            Responsável
          </label>
          <input
            id="assignee"
            name="assignee"
            type="text"
            required
            defaultValue={ticket.assignee}
            placeholder="Quem será o responsável por esse ticket"
            className="w-full rounded-2xl border border-glass-edge bg-neutral-100/5 px-5 py-4 text-xs text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="subject"
            className="text-sm font-space-grotesk tracking-tight text-neutral-100 pl-4"
          >
            Assunto
          </label>
          <textarea
            id="subject"
            name="subject"
            required
            rows={4}
            defaultValue={ticket.subject}
            placeholder="Resumo breve do problema ou solicitação"
            className="w-full rounded-2xl border border-glass-edge bg-neutral-100/5 px-5 py-4 text-xs text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-primary resize-none"
          />
        </div>

        <div className="flex gap-4 justify-center mt-4">
          <EditTicketFormCancelButton />

          <EditTicketSubmitButton />
        </div>
      </form>
    </div>
  );
}
