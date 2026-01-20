"use client";

import {
  usePlanSimulatorDispatch,
  usePlanSimulatorSelector,
} from "@/app/(authenticated)/plan-simulator/_store/hooks";
import {
  setSelectedPlan,
  PlanType,
  PlanSimulatorState,
} from "@/app/(authenticated)/plan-simulator/_store/planSimulatorSlice";
import { calculatePlanPrice } from "../_utils/calculations";
import { formatCurrency } from "../_utils/formatters";
import { PlanSimulatorRootState } from "@/app/(authenticated)/plan-simulator/_store/planSimulatorStore";

export default function PlanCards() {
  const dispatch = usePlanSimulatorDispatch();
  const {
    plans,
    selectedPlan,
    vehicleValue,
    clientAge,
    additionalCoverages,
  }: PlanSimulatorState = usePlanSimulatorSelector(
    (state: PlanSimulatorRootState) => state.planSimulator
  );

  const handleSelectPlan = (planId: PlanType) => {
    dispatch(setSelectedPlan(planId));
  };

  if (plans.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-4 overflow-x-auto">
      {plans.map((plan) => {
        const isSelected = selectedPlan === plan.id;
        const calculatedPrice = calculatePlanPrice(
          plan.basePrice,
          vehicleValue,
          clientAge,
          additionalCoverages
        );

        return (
          <button
            key={plan.id}
            type="button"
            onClick={() => handleSelectPlan(plan.id)}
            className={`flex-1 flex flex-col items-start gap-5 p-4 rounded-xl border transition-all cursor-pointer ${
              isSelected
                ? "border-primary bg-neutral-100/5"
                : "border-glass-edge bg-neutral-100/5 hover:bg-neutral-100/0"
            }`}
          >
            <div className="flex items-start justify-between w-full">
              <span className="text-xs font-montserrat font-bold text-neutral-100">
                {plan.name}
              </span>
              {plan.recommended && (
                <span className="px-2 py-1 text-xs font-montserrat rounded-full bg-info-neutral text-background">
                  Recomendado
                </span>
              )}
            </div>
            <span className="text-xl font-montserrat font-bold text-neutral-100">
              {formatCurrency(calculatedPrice)}
            </span>
            <span className="text-xs font-montserrat text-neutral-400">
              Por mês
            </span>
          </button>
        );
      })}
    </div>
  );
}
