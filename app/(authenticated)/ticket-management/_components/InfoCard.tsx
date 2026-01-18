import Image from "next/image";

interface InfoCardProps {
  title: string;
  value: string;
  icon: string;
}

export default function InfoCard({ title, value, icon }: InfoCardProps) {
  return (
    <div className="rounded-xl bg-neutral-100/5 border border-glass-edge-info backdrop-blur-sm p-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm text-neutral-300">{title}</h3>
        <Image src={icon} alt={title} width={24} height={24} />
      </div>
      <p className="text-2xl font-semibold text-neutral-100">{value}</p>
    </div>
  );
}

