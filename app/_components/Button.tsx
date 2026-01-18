export enum ButtonVariant {
  PRIMARY = "primary",
  OUTLINED = "outlined",
  ACTION = "action",
  ICON = "icon",
  NAV = "nav",
}

interface ButtonProps {
  type: "button" | "submit" | "reset";
  className?: string;
  variant: ButtonVariant;
  children: React.ReactNode;
}

export default function Button(props: ButtonProps) {
  const { type, className, variant, children } = props;

  if (variant == ButtonVariant.OUTLINED) {
    return (
      <button
        type={type}
        className={`rounded-xl border border-neutral-200 px-6 py-4 text-neutral-100 text-sm cursor-pointer ${className}`}
      >
        {children}
      </button>
    )
  }

  if (variant == ButtonVariant.NAV) {
    return (
      <button
        type={type}
        className={`rounded-full shadow-2xl bg-neutral-100/5 px-6 py-4 text-neutral-100 text-sm cursor-pointer ${className}`}
      >
        {children}
      </button>
    )
  }

  if (variant == ButtonVariant.ACTION) {
    return (
      <button
        type={type}
        className={`rounded-full bg-primary shadow-4xl px-4 py-2 text-foreground text-xs cursor-pointer ${className}`}
      >
        {children}
      </button>
    )
  }

  return (
    <div className={`relative rounded-xl bg-primary ${className}`}>
      <div className="absolute inset-0 rounded-xl bg-linear-to-bl from-neutral-100 to-neutral-100/5 mix-blend-overlay" />
      <div className="relative w-full p-px">
        <button
          type={type}
          className="w-full rounded-xl bg-primary px-6 py-4 text-neutral-100 text-sm cursor-pointer"
        >
          {children}
        </button>
      </div>
    </div>
  )
}
