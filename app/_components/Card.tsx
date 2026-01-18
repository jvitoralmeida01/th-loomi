export default function Card({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <div className={`rounded-3xl bg-neutral-100/5 border border-glass-edge-info backdrop-blur-sm ${className}`}>
      {children}
    </div>
  );
}
