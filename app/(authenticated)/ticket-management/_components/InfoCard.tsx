import Image from "next/image";

interface InfoCardProps {
  title: string;
  value: string;
  icon: string;
}

export default function InfoCard({ title, value, icon }: InfoCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-neutral-100/5 border border-glass-edge-info backdrop-blur-sm p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-montserrat font-normal text-xs text-neutral-100">
          {title}
        </h3>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xl font-montserrat font-bold text-neutral-100">
          {value}
        </p>
        <Image src={icon} alt={title} className="w-6 h-6 pointer-events-none" />
      </div>
    </div>
  );
}
