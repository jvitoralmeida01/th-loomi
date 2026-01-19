import Image from "next/image";
import ClientsTableFilters from "./ClientsTableFilters";
import ClientsTableRow from "./ClientsTableRow";
import { Client } from "../actions";
import sortArrowIcon from "@/assets/icons/sort_arrow.svg";
import sortLetttersIcon from "@/assets/icons/sort_letters.svg";

interface ClientsTableProps {
  clients: Client[];
}

export default function ClientsTable({ clients }: ClientsTableProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-md font-montserrat font-bold text-neutral-100">
          Clientes ativos
        </h2>

        <ClientsTableFilters />
      </div>

      <div className="overflow-x-auto rounded-xl bg-neutral-100/5 px-4 py-1 mt-2 pb-4">
        <table className="w-full table-fixed text-left">
          <thead>
            <tr className="border-b border-glass-edge">
              <th className="w-[18%] px-2 py-4 text-xs font-montserrat font-normal text-neutral-100/70">
                <div className="flex items-center gap-1">
                  Nome
                  <div className="flex flex-row">
                    <Image
                      src={sortArrowIcon}
                      alt="Sort Arrow Icon"
                      className="w-3 h-3"
                    />
                    <Image
                      src={sortLetttersIcon}
                      alt="Sort Letters Icon"
                      className="w-3 h-3 -ml-1"
                    />
                  </div>
                </div>
              </th>
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
