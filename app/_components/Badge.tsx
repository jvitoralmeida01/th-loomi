interface BadgeProps {
  label: string;
  variant: "urgent" | "medium" | "low" | "open" | "in-progress" | "resolved";
  className?: string;
}

export default function Badge({ label, variant, className = "" }: BadgeProps) {
  const variantStyles = {
    urgent: "bg-priority-high text-neutral-100",
    medium: "bg-priority-neutral text-background",
    low: "bg-priority-low text-background",
    open: "bg-info-neutral text-background",
    "in-progress": "bg-info-warn text-background",
    resolved: "bg-neutral-400 text-background",
  };

  return (
    <div
      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium whitespace-nowrap max-w-full ${variantStyles[variant]} ${className}`}
    >
      <span className="overflow-hidden text-ellipsis">{label}</span>
    </div>
  );
}

