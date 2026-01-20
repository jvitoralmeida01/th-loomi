"use client";

import Image from "next/image";
import {
  usePlanSimulatorDispatch,
  usePlanSimulatorSelector,
} from "@/app/(authenticated)/plan-simulator/_store/hooks";
import { toggleCoverage } from "@/app/(authenticated)/plan-simulator/_store/planSimulatorSlice";
import { formatCurrency } from "../_utils/formatters";
import checkIcon from "@/assets/icons/check.svg";
import { PlanSimulatorRootState } from "@/app/(authenticated)/plan-simulator/_store/planSimulatorStore";

export default function AdditionalCoverages() {
  const dispatch = usePlanSimulatorDispatch();
  const additionalCoverages = usePlanSimulatorSelector(
    (state: PlanSimulatorRootState) => state.planSimulator.additionalCoverages
  );

  const handleToggle = (coverageId: string) => {
    dispatch(toggleCoverage(coverageId));
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-montserrat font-semibold text-neutral-100">
        Coberturas Adicionais
      </h3>
      <div className="flex flex-col gap-3">
        {additionalCoverages.map((coverage) => (
          <label
            key={coverage.id}
            className="flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleToggle(coverage.id.toString())}
                className="relative"
              >
                <span
                  className={`flex items-center justify-center h-4 w-4 rounded border transition-all ${
                    coverage.selected
                      ? "border-primary bg-primary"
                      : "border-neutral-300 bg-transparent group-hover:border-primary/50"
                  }`}
                >
                  {coverage.selected && (
                    <Image
                      src={checkIcon}
                      alt="Selecionado"
                      className="w-3 h-3"
                    />
                  )}
                </span>
              </button>
              <span className="text-xs font-montserrat text-neutral-100">
                {coverage.name}
              </span>
            </div>
            <span className="text-xs font-montserrat font-bold text-neutral-100">
              + {formatCurrency(coverage.price)}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
