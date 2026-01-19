import { PlanType, AdditionalCoverage } from "@/app/(authenticated)/plan-simulator/_store/planSimulatorSlice";

export interface Plan {
  id: PlanType;
  name: string;
  basePrice: number;
  recommended?: boolean;
  benefits: string[];
  baseConversionRate: number;
  baseRoi: number;
}

export const plans: Plan[] = [
  {
    id: "basic",
    name: "Básico",
    basePrice: 89.9,
    benefits: ["Assistência 24h", "Guincho até 100km", "Cobertura básica"],
    baseConversionRate: 75,
    baseRoi: 80,
  },
  {
    id: "intermediate",
    name: "Intermediário",
    basePrice: 145.9,
    benefits: ["Tudo do básico", "Carro reserva", "Vidros"],
    baseConversionRate: 48,
    baseRoi: 114,
  },
  {
    id: "premium",
    name: "Premium",
    basePrice: 225.9,
    recommended: true,
    benefits: [
      "Tudo do intermediário",
      "Cobertura total",
      "Assistência premium",
      "Sem franquia",
    ],
    baseConversionRate: 25,
    baseRoi: 176,
  },
];

export const vehicleValueRange = {
  min: 10000,
  max: 500000,
  step: 1000,
};

export const clientAgeRange = {
  min: 18,
  max: 90,
  step: 1,
};

export function calculatePlanPrice(
  basePrice: number,
  vehicleValue: number,
  clientAge: number,
  additionalCoverages: AdditionalCoverage[] = []
): number {
  const vehicleFactor = 1 + (vehicleValue - 50000) / 500000;

  let ageFactor = 1;
  if (clientAge < 25) {
    ageFactor = 1 + (25 - clientAge) * 0.02;
  } else if (clientAge > 65) {
    ageFactor = 1 + (clientAge - 65) * 0.015;
  }

  const basePlanPrice = basePrice * vehicleFactor * ageFactor;

  const additionalCoverageTotal = additionalCoverages
    .filter((coverage) => coverage.selected)
    .reduce((total, coverage) => total + coverage.price, 0);

  return Math.round((basePlanPrice + additionalCoverageTotal) * 100) / 100;
}

export function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function getPlanById(planId: PlanType): Plan | undefined {
  return plans.find((plan) => plan.id === planId);
}

export function calculateConversionRate(
  baseConversionRate: number,
  basePrice: number,
  calculatedPrice: number
): number {
  const priceRatio = calculatedPrice / basePrice;

  const conversionRate = baseConversionRate * (1 - (priceRatio - 1) * 0.3);

  return Math.max(5, Math.min(100, Math.round(conversionRate * 10) / 10));
}

export function calculateRoi(
  baseRoi: number,
  basePrice: number,
  calculatedPrice: number,
  vehicleValue: number,
  clientAge: number
): number {
  const priceRatio = calculatedPrice / basePrice;

  const vehicleRiskFactor = Math.min(1.2, 1 + (vehicleValue - 50000) / 500000);
  let ageRiskFactor = 1;
  if (clientAge < 25) {
    ageRiskFactor = 0.95;
  } else if (clientAge > 65) {
    ageRiskFactor = 0.98;
  }

  const roi = baseRoi * priceRatio * vehicleRiskFactor * ageRiskFactor;

  return Math.max(0, Math.min(300, Math.round(roi * 10) / 10));
}

