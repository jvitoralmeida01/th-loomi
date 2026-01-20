import { TicketPriority, TicketStatus } from "@/src/domain/entities/tickets";

interface BadgeProps {
  label: string;
  variant: TicketPriority | TicketStatus | "Ativo" | "Pendente";
  className?: string;
}

export default function Badge({ label, variant, className = "" }: BadgeProps) {
  const variantStyles = {
    'Urgente': "bg-priority-high text-neutral-100",
    'Média': "bg-priority-neutral text-background",
    'Baixa': "bg-priority-low text-background",
    'Aberto': "bg-info-neutral text-background",
    'Em andamento': "bg-info-warn text-background",
    'Fechado': "bg-neutral-500 text-neutral-100",
    'Ativo': "bg-info-neutral text-background",
    'Pendente': "bg-info-warn text-background",
  };

  return (
    <div
      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-Média whitespace-nowrap max-w-full ${variantStyles[variant]} ${className}`}
    >
      <span className="overflow-hidden text-ellipsis">{label}</span>
    </div>
  );
}

