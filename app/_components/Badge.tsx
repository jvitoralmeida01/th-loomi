interface BadgeProps {
  label: string;
  variant: "urgent" | "medium" | "low" | "open" | "in-progress" | "resolved";
  className?: string;
}

export default function Badge({ label, variant, className = "" }: BadgeProps) {
  const variantStyles = {
    urgent: "bg-priority-high text-neutral-100",
    medium: "bg-priority-neutral text-neutral-100",
    low: "bg-priority-low text-neutral-100",
    open: "bg-info-neutral text-neutral-100",
    "in-progress": "bg-info-warn text-neutral-100",
    resolved: "bg-neutral-400 text-neutral-100",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {label}
    </span>
  );
}

