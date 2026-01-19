"use client";

import { usePlanSimulatorDispatch, usePlanSimulatorSelector } from "@/app/(authenticated)/plan-simulator/_store/hooks";
import { setClientAge } from "@/app/(authenticated)/plan-simulator/_store/planSimulatorSlice";
import { clientAgeRange } from "../_utils/mock";
import { PlanSimulatorRootState } from "@/app/(authenticated)/plan-simulator/_store/planSimulatorStore";

export default function ClientAgeSlider() {
  const dispatch = usePlanSimulatorDispatch();
  const clientAge = usePlanSimulatorSelector((state: PlanSimulatorRootState) => state.planSimulator.clientAge);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setClientAge(Number(e.target.value)));
  };

  const percentage =
    ((clientAge - clientAgeRange.min) /
      (clientAgeRange.max - clientAgeRange.min)) *
    100;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-montserrat font-semibold text-neutral-100">
          Idade do Cliente: {clientAge} anos
        </span>
      </div>
      <div className="flex">
        <input
          type="range"
          min={clientAgeRange.min}
          max={clientAgeRange.max}
          step={clientAgeRange.step}
          value={clientAge}
          onChange={handleChange}
          className="w-full h-1 rounded-full appearance-none cursor-pointer slider-age"
          style={{
            background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${percentage}%, var(--color-neutral-100) ${percentage}%, var(--color-neutral-100) 100%)`,
          }}
        />
      </div>
      <div className="flex justify-between text-xs font-montserrat text-neutral-100">
        <span>{clientAgeRange.min} anos</span>
        <span>{clientAgeRange.max} anos</span>
      </div>
    </div>
  );
}

