export default function Spinner({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-3",
    lg: "w-14 h-14 border-4",
  };

  return (
    <div
      className={`${sizeClasses[size]} border-neutral-400/30 border-t-primary rounded-full animate-spin`}
    />
  );
}
