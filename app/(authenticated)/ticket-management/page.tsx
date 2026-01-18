import InfoCard from "./_components/InfoCard";
import TableRow from "../../_components/TableRow";
import Pagination from "../../_components/Pagination";
import openTicketIcon from "@/assets/icons/open_ticket.svg";
import incomingIcon from "@/assets/icons/incoming.svg";
import checkboxIcon from "@/assets/icons/checkbox.svg";
import clockIcon from "@/assets/icons/clock.svg";
import Filters from "./_components/Filters";
import { getTickets } from "./actions";
import { mockOpenTickets, mockInProgressTickets, mockResolvedToday, mockAverageTime } from "./_utils/mock";
import Card from "@/app/_components/Card";

const ITEMS_PER_PAGE = 7;

interface TicketManagementPageProps {
  searchParams?: Promise<{
    query?: Promise<string>;
    status?: Promise<string>;
    priority?: Promise<string>;
    assignee?: Promise<string>;
    page?: Promise<string>;
  }>;
}

export default async function TicketManagementPage({
  searchParams,
}: Readonly<TicketManagementPageProps>) {
  const params = await searchParams;
  const query = await params?.query || "";
  const status = await params?.status || "";
  const priority = await params?.priority || "";
  const assignee = await params?.assignee || "";
  const page = parseInt(await params?.page || "1", 10);

  const { tickets: paginatedTickets, totalPages, currentPage } = await getTickets({
    query,
    status,
    priority,
    assignee,
    page,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  console.log(`size: ${paginatedTickets?.length}`);

  return (
    <div className="py-8 px-6 md:px-12 lg:px-20 xl:px-40 space-y-8 max-w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <InfoCard
          title="Tickets Abertos"
          value={mockOpenTickets.toString()}
          icon={openTicketIcon}
        />
        <InfoCard
          title="Em andamento"
          value={mockInProgressTickets.toString()}
          icon={incomingIcon}
        />
        <InfoCard
          title="Resolvidos hoje"
          value={mockResolvedToday.toString()}
          icon={checkboxIcon}
        />
        <InfoCard title="Tempo Médio" value={mockAverageTime} icon={clockIcon} />
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold text-neutral-100 mb-6">Lista de Tickets</h2>

        <Filters />

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-glass-edge">
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Prioridade
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Assunto
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Criado em
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Responsável
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedTickets.map((ticket) => (
                <TableRow key={ticket.id} ticket={ticket} />
              ))}
            </tbody>
          </table>
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </Card>
    </div>
  );
}
