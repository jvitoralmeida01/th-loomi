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
  variant?: ButtonVariant;
  children: React.ReactNode;
  disabled?: boolean;
}

export default function Button(props: ButtonProps) {
  const {
    type,
    className,
    variant = ButtonVariant.PRIMARY,
    children,
    disabled = false,
  } = props;

  if (variant == ButtonVariant.NAV) {
    return (
      <button
        type={type}
        disabled={disabled}
        className={`rounded-full shadow-2xl bg-neutral-100/5 px-6 py-4 text-neutral-100 text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        {children}
      </button>
    );
  }

  return (
    <div
      className={`relative rounded-xl bg-primary ${disabled ? "opacity-50" : ""} ${className}`}
    >
      <div className="absolute inset-0 rounded-xl bg-linear-to-bl from-neutral-100 to-neutral-100/5 mix-blend-overlay" />
      <div className="relative w-full p-px">
        <button
          type={type}
          disabled={disabled}
          className="w-full rounded-xl bg-primary px-6 py-4 text-neutral-100 text-sm cursor-pointer disabled:cursor-not-allowed"
        >
          {children}
        </button>
      </div>
    </div>
  );
}
