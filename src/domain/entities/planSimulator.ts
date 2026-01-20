export type PlanType = "basic" | "intermediate" | "premium";

export interface Plan {
  id: PlanType;
  name: string;
  basePrice: number;
  recommended: boolean;
  baseConversionRate: number;
  baseRoi: number;
}

export interface PlanSimulatorData {
  includedBenefits: string[];
  plans: Plan[];
}
