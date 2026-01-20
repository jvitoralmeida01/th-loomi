"use client";

import { usePlanSimulatorSelector } from "@/app/(authenticated)/plan-simulator/_store/hooks";
import {
  calculatePlanPrice,
  calculateConversionRate,
  calculateRoi,
} from "../_utils/calculations";
import { formatCurrency } from "../_utils/formatters";
import { PlanSimulatorRootState } from "@/app/(authenticated)/plan-simulator/_store/planSimulatorStore";

export default function PlanIndicators() {
  const { plans, vehicleValue, clientAge, additionalCoverages } =
    usePlanSimulatorSelector(
      (state: PlanSimulatorRootState) => state.planSimulator
    );

  if (plans.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-md font-montserrat font-bold text-neutral-100">
        Indicadores
      </h3>
      <div className="flex flex-col gap-6">
        {plans.map((plan) => {
          const calculatedPrice = calculatePlanPrice(
            plan.basePrice,
            vehicleValue,
            clientAge,
            additionalCoverages
          );

          const conversionRate = calculateConversionRate(
            plan.baseConversionRate,
            plan.basePrice,
            calculatedPrice
          );

          const roi = calculateRoi(
            plan.baseRoi,
            plan.basePrice,
            calculatedPrice,
            vehicleValue,
            clientAge
          );

          return (
            <div
              key={plan.id}
              className="flex flex-col items-start justify-between p-4 rounded-xl bg-neutral-100/5 border border-glass-edge xl:flex-row xl:items-center"
            >
              <div className="flex flex-col gap-1 py-1 flex-1 min-w-0">
                <span className="text-sm font-montserrat font-bold text-neutral-100">
                  {plan.name}
                </span>

                <div className="flex flex-col items-start gap-2 text-xs font-montserrat font-normal xl:flex-row xl:items-center">
                  <span className="text-neutral-100 inline-block">
                    Conversão:{" "}
                    <span className="text-info-success text-glow-info-success">
                      {Math.round(conversionRate)}%
                    </span>
                  </span>

                  <span className="text-neutral-100 inline-block">
                    ROI:{" "}
                    <span className="text-info-success text-glow-info-success">
                      {Math.round(roi)}%
                    </span>
                  </span>
                </div>
              </div>
              <span className="text-md font-montserrat font-bold text-neutral-100">
                {formatCurrency(calculatedPrice)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
