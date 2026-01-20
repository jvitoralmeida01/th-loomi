import InfoCard from "./_components/InfoCard";
import TableRow from "./_components/TableRow";
import Pagination from "../../_components/Pagination";
import openTicketIcon from "@/assets/icons/open_ticket.svg";
import incomingIcon from "@/assets/icons/incoming.svg";
import checkboxIcon from "@/assets/icons/checkbox.svg";
import clockIcon from "@/assets/icons/clock.svg";
import Filters from "./_components/Filters";
import {
  getTickets,
  getAllAssignees,
  getInfoCardsData,
  getTicketById,
} from "./actions";
import Card from "@/app/_components/Card";
import Modal from "@/app/_components/Modal";
import NewTicketForm from "./_components/NewTicketForm";
import NewTicketFeedback from "./_components/NewTicketFeedback";
import EditTicketForm from "./_components/EditTicketForm";
import EditTicketFeedback from "./_components/EditTicketFeedback";
import { CreateTicketInput } from "@/src/application/useCases/CreateTicketUseCase";

const ITEMS_PER_PAGE = 5;

interface TicketManagementPageProps {
  searchParams?: Promise<{
    query?: Promise<string>;
    status?: Promise<string>;
    priority?: Promise<string>;
    assignee?: Promise<string>;
    page?: Promise<string>;
    newTicket?: Promise<string>;
    editTicket?: Promise<string>;
    formData?: Promise<string>;
  }>;
}

export default async function TicketManagementPage({
  searchParams,
}: Readonly<TicketManagementPageProps>) {
  const params = await searchParams;
  const query = (await params?.query) || "";
  const status = (await params?.status) || "";
  const priority = (await params?.priority) || "";
  const assignee = (await params?.assignee) || "";
  const page = parseInt((await params?.page) || "1", 10);
  const showNewTicketModal = Boolean(await params?.newTicket);
  const editTicketId = (await params?.editTicket) || "";

  const [
    { tickets: paginatedTickets, totalPages, currentPage },
    { assignees },
    infoCardsData,
  ] = await Promise.all([
    getTickets({
      query,
      status,
      priority,
      assignee,
      page,
      itemsPerPage: ITEMS_PER_PAGE,
    }),
    getAllAssignees(),
    getInfoCardsData(),
  ]);

  const editTicketData = editTicketId
    ? await getTicketById(editTicketId)
    : null;
  const showEditTicketModal = Boolean(
    editTicketId && editTicketData?.success && editTicketData?.ticket
  );

  return (
    <div className="flex flex-col gap-8 py-8 px-32 max-w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <InfoCard
          title="Tickets Abertos"
          value={infoCardsData.openedTickets.toString()}
          icon={openTicketIcon}
        />
        <InfoCard
          title="Em andamento"
          value={infoCardsData.inProgressTickets.toString()}
          icon={incomingIcon}
        />
        <InfoCard
          title="Resolvidos hoje"
          value={infoCardsData.resolvedTodayTickets.toString()}
          icon={checkboxIcon}
        />
        <InfoCard
          title="Tempo Médio"
          value={infoCardsData.averageTime.toString()}
          icon={clockIcon}
        />
      </div>

      <Card className="flex flex-col gap-2 p-6">
        <h2 className="text-md font-montserrat font-bold text-neutral-100">
          Lista de Tickets
        </h2>

        <Filters assignees={assignees} />

        <div className="overflow-x-auto rounded-xl bg-neutral-100/5 px-4 py-1 mt-2 pb-4">
          <table className="w-full table-fixed text-left">
            <thead>
              <tr className="border-b border-glass-edge">
                <th className="w-[8%] px-2 py-4 text-xs font-montserrat font-normal text-neutral-100/70">
                  ID
                </th>
                <th className="w-[10%] px-2 py-4 text-xs font-montserrat font-normal text-neutral-100/70">
                  Prioridade
                </th>
                <th className="w-[20%] px-2 py-4 text-xs font-montserrat font-normal text-neutral-100/70">
                  Cliente
                </th>
                <th className="w-[18%] px-2 py-4 text-xs font-montserrat font-normal text-neutral-100/70">
                  Assunto
                </th>
                <th className="w-[12%] px-2 py-4 text-xs font-montserrat font-normal text-neutral-100/70">
                  Status
                </th>
                <th className="w-[10%] px-2 py-4 text-xs font-montserrat font-normal text-neutral-100/70">
                  Criado em
                </th>
                <th className="w-[10%] px-2 py-4 text-xs font-montserrat font-normal text-neutral-100/70">
                  Responsável
                </th>
                <th className="w-[12%] px-2 py-4 text-xs font-montserrat font-normal text-neutral-100/70">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedTickets.map((ticket, index) => (
                <TableRow
                  key={ticket.id}
                  ticket={ticket}
                  isLastRow={index === paginatedTickets.length - 1}
                />
              ))}
              {paginatedTickets.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    className="px-2 py-8 text-center text-xs text-neutral-400"
                  >
                    Nenhum ticket encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </Card>

      <Modal isOpen={showNewTicketModal}>
        <NewTicketForm />
      </Modal>
      <NewTicketFeedback />

      <Modal isOpen={showEditTicketModal && !showNewTicketModal}>
        {editTicketData?.ticket && (
          <EditTicketForm ticket={editTicketData.ticket} />
        )}
      </Modal>
      <EditTicketFeedback />
    </div>
  );
}
