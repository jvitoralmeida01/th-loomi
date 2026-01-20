import { AdditionalCoverage } from "@/app/(authenticated)/plan-simulator/_store/planSimulatorSlice";
import { Plan } from "@/src/domain/entities/planSimulator";

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

export function getPlanById(plans: Plan[], planId: string): Plan | undefined {
  return plans.find((plan) => plan.id === planId);
}
