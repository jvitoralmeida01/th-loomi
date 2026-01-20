"use client";

import { usePlanSimulatorDispatch, usePlanSimulatorSelector } from "@/app/(authenticated)/plan-simulator/_store/hooks";
import { setVehicleValue } from "@/app/(authenticated)/plan-simulator/_store/planSimulatorSlice";
import { vehicleValueRange } from "../_utils/config";
import { formatCurrency } from "../_utils/formatters";
import { PlanSimulatorRootState } from "@/app/(authenticated)/plan-simulator/_store/planSimulatorStore";

export default function VehicleValueSlider() {
  const dispatch = usePlanSimulatorDispatch();
  const vehicleValue: number = usePlanSimulatorSelector(
    (state: PlanSimulatorRootState) => state.planSimulator.vehicleValue
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setVehicleValue(Number(e.target.value)));
  };

  const percentage =
    ((vehicleValue - vehicleValueRange.min) /
      (vehicleValueRange.max - vehicleValueRange.min)) *
    100;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-montserrat font-semibold text-neutral-100">
          Valor do veículo: {formatCurrency(vehicleValue)}
        </span>
      </div>
      <div className="flex">
        <input
          type="range"
          min={vehicleValueRange.min}
          max={vehicleValueRange.max}
          step={vehicleValueRange.step}
          value={vehicleValue}
          onChange={handleChange}
          className="w-full h-1 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${percentage}%, var(--color-neutral-100) ${percentage}%, var(--color-neutral-100) 100%)`,
          }}
        />
      </div>
      <div className="flex justify-between text-xs font-montserrat text-neutral-100">
        <span>{formatCurrency(vehicleValueRange.min)}</span>
        <span>{formatCurrency(vehicleValueRange.max)}</span>
      </div>
    </div>
  );
}
