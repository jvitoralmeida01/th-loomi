import { AdditionalCoverage } from "@/app/(authenticated)/plan-simulator/_store/planSimulatorSlice";
import { PlanType } from "@/src/domain/entities/planSimulator";

export { type Plan, type PlanType } from "@/src/domain/entities/planSimulator";

export interface SliderRange {
  min: number;
  max: number;
  step: number;
}

export const vehicleValueRange: SliderRange = {
  min: 10000,
  max: 500000,
  step: 1000,
};

export const clientAgeRange: SliderRange = {
  min: 18,
  max: 90,
  step: 1,
};

export const defaultAdditionalCoverages: AdditionalCoverage[] = [
  {
    id: 0,
    name: "Cobertura contra roubo e furto",
    price: 25,
    selected: true,
  },
  {
    id: 1,
    name: "Danos por colisão",
    price: 35,
    selected: true,
  },
  {
    id: 2,
    name: "Cobertura contra incêndio",
    price: 20,
    selected: true,
  },
  {
    id: 3,
    name: "Fenômenos naturais (granizo, enchente)",
    price: 30,
    selected: false,
  },
];

export const defaultVehicleValue = 50000;
export const defaultClientAge = 28;
export const defaultSelectedPlan: PlanType = "intermediate";
