"use client";

export default function IncludedBenefits({ benefits }: { benefits: string[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-md font-montserrat font-bold text-neutral-100">
        Benefícios Inclusos
      </h3>
      <div className="flex flex-wrap gap-2">
        {benefits.map((benefit, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-neutral-100/5 border border-glass-edge text-xs font-montserrat text-neutral-100"
          >
            <span className="w-2 h-2 rounded-full bg-primary glow-primary" />
            {benefit}
          </span>
        ))}
      </div>
    </div>
  );
}
