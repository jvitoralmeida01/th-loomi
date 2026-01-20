import ClientsTableFilters from "./ClientsTableFilters";
import ClientsTableRow from "./ClientsTableRow";
import SortTableHeader from "./SortTableHeader";
import { Client } from "@/src/domain/entities/dashboard";

interface ClientsTableProps {
  clients: Client[];
  statusValues: string[];
  typeValues: string[];
  regionValues: string[];
}

export default function ClientsTable({ clients, statusValues, typeValues, regionValues }: ClientsTableProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-md font-montserrat font-bold text-neutral-100">
          Clientes ativos
        </h2>

        <ClientsTableFilters statusValues={statusValues} typeValues={typeValues} regionValues={regionValues} />
      </div>

      <div className="overflow-x-auto rounded-xl bg-neutral-100/5 px-4 py-1 mt-2 pb-4">
        <table className="w-full table-fixed text-left">
          <thead>
            <tr className="border-b border-glass-edge">
              <SortTableHeader label="Nome" width="w-[18%]" />
              <th className="w-[18%] px-2 py-4 text-xs font-montserrat font-normal text-neutral-100/70">
                Tipo de Seguro
              </th>
              <th className="w-[14%] px-2 py-4 text-xs font-montserrat font-normal text-neutral-100/70">
                Valor mensal
              </th>
              <th className="w-[12%] px-2 py-4 text-xs font-montserrat font-normal text-neutral-100/70">
                Status
              </th>
              <th className="w-[14%] px-2 py-4 text-xs font-montserrat font-normal text-neutral-100/70">
                Renovação
              </th>
              <th className="w-[14%] px-2 py-4 text-xs font-montserrat font-normal text-neutral-100/70">
                Região
              </th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client: Client, index: number) => (
              <ClientsTableRow
                key={client.id}
                client={client}
                isLastRow={index === clients.length - 1}
              />
            ))}
            {clients.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-2 py-8 text-center text-xs text-neutral-400"
                >
                  Nenhum cliente encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
