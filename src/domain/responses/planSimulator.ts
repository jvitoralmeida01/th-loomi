interface PlanIndicatorResponse {
  name: string;
  conversion: number;
  roi: number;
  value: number;
}

export interface PlanSimulatorDataResponse {
  includedBenefits: string[];
  plansIndicators: PlanIndicatorResponse[];
}
