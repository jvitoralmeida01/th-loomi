import Button from "@/app/_components/Button";
import { cancelTicketCreation, fillTicketParameters } from "../actions";
import Image from "next/image";
import CloseOutlinedIcon from "@/assets/icons/close_outlined.svg";
import NewTicketFormCancelButton from "./NewTicketFormCancelButton";
import ArrowDownIcon from "@/assets/icons/arrow_down.svg";
import { TicketPriorityValues } from "@/src/domain/entities/tickets";

export default function NewTicketForm() {
  return (
    <div className="bg-background rounded-xl p-6 w-full max-w-2xl">
      <div className="flex flex-col gap-4 items-start justify-between mb-4">
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="text-xl font-space-grotesk tracking-tight font-regular text-neutral-100">Novo Ticket</h1>
          <form action={cancelTicketCreation}>
            <button
              type="submit"
              className="flex items-center justify-center rounded-full hover:bg-neutral-100/5 text-neutral-200 text-lg font-bold cursor-pointer"
              aria-label="Fechar"
            >
              <Image src={CloseOutlinedIcon} alt="Close Icon" className="w-10 h-10" />
            </button>
          </form>
        </div>

        <p className="text-xs text-neutral-100">
          Preencha os dados abaixo para registrar um novo ticket na plataforma.
        </p>

      </div>

      <form action={fillTicketParameters} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="clientName" className="text-sm font-space-grotesk tracking-tight text-neutral-100 pl-4">
            Nome do cliente
          </label>
          <input
            id="clientName"
            name="clientName"
            type="text"
            required
            placeholder="Nome da pessoa ou empresa que está solicitando o suporte"
            className="w-full rounded-2xl border border-glass-edge bg-neutral-100/5 px-5 py-4 text-xs text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-space-grotesk tracking-tight text-neutral-100 pl-4">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="E-mail de contato para atualizações e resposta"
            className="w-full rounded-2xl border border-glass-edge bg-neutral-100/5 px-5 py-4 text-xs text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="priority" className="text-sm font-space-grotesk tracking-tight text-neutral-100 pl-4">
            Prioridade
          </label>
          <div className="relative">
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <Image src={ArrowDownIcon} alt="Arrow Down Icon" className="w-3 h-3" />
            </div>
            <select
              id="priority"
              name="priority"
              required
              className="appearance-none w-full rounded-2xl border border-glass-edge bg-neutral-100/5 px-5 py-4 text-xs text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="" disabled className="bg-background">
                Selecione o nível de urgência do atendimento
              </option>
              {TicketPriorityValues
                .filter((priority) => priority !== "Urgente")
                .map((priority) => (
                  <option key={priority} value={priority} className="bg-background">
                    {priority}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="assignee" className="text-sm font-space-grotesk tracking-tight text-neutral-100 pl-4">
            Responsável
          </label>
          <input
            id="assignee"
            name="assignee"
            type="text"
            required
            placeholder="Quem será o responsável por esse ticket"
            className="w-full rounded-2xl border border-glass-edge bg-neutral-100/5 px-5 py-4 text-xs text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="subject" className="text-sm font-space-grotesk tracking-tight text-neutral-100 pl-4">
            Assunto
          </label>
          <textarea
            id="subject"
            name="subject"
            required
            rows={4}
            placeholder="Resumo breve do problema ou solicitação"
            className="w-full rounded-2xl border border-glass-edge bg-neutral-100/5 px-5 py-4 text-xs text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-primary resize-none"
          />
        </div>

        <div className="flex gap-4 justify-center mt-4">
          <NewTicketFormCancelButton />

          <Button type="submit">
            Salvar
          </Button>
        </div>
      </form>
    </div>
  );
}
