import Badge from "@/app/_components/Badge";
import {
  Client,
  insuranceTypeLabels,
  clientStatusLabels,
} from "../_utils/mock";

interface ClientsTableRowProps {
  client: Client;
  isLastRow?: boolean;
}

export default function ClientsTableRow({
  client,
  isLastRow = false,
}: ClientsTableRowProps) {
  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <tr
      className={`border-b border-glass-edge hover:bg-neutral-100/10 transition-colors ${isLastRow ? "border-b-0" : "border-b"}`}
    >
      <td
        className="px-2 py-4"
        title={`${client.name} - ${client.email}`}
      >
        <div className="flex flex-col">
          <span className="font-montserrat font-semibold text-xs text-neutral-100 overflow-hidden text-ellipsis">
            {client.name}
          </span>
          <span className="font-montserrat font-normal text-xs text-neutral-100 overflow-hidden text-ellipsis">
            {client.email}
          </span>
        </div>
      </td>
      <td
        className="px-2 py-4 font-montserrat font-semibold text-xs text-neutral-100 overflow-hidden text-ellipsis"
        title={insuranceTypeLabels[client.insuranceType]}
      >
        {insuranceTypeLabels[client.insuranceType]}
      </td>
      <td
        className="px-2 py-4 font-montserrat font-semibold text-xs text-neutral-100 overflow-hidden text-ellipsis"
        title={formatCurrency(client.monthlyValue)}
      >
        {formatCurrency(client.monthlyValue)}
      </td>
      <td className="px-2 py-4" title={clientStatusLabels[client.status]}>
        <Badge
          variant={client.status}
          label={clientStatusLabels[client.status]}
        />
      </td>
      <td
        className="px-2 py-4 font-montserrat font-semibold text-xs text-neutral-100 overflow-hidden text-ellipsis"
        title={client.renewalDate}
      >
        {client.renewalDate}
      </td>
      <td
        className="px-2 py-4 font-montserrat font-semibold text-xs text-neutral-100 overflow-hidden text-ellipsis"
        title={client.region}
      >
        {client.region}
      </td>
    </tr>
  );
}

