"use server";

import { container } from "@/di/container";
import { PlanSimulatorService } from "@/src/application/services/PlanSimulatorService";
import { GetPlanSimulatorDataOutput } from "@/src/application/useCases/GetPlanSimulatorDataUseCase";

export async function getPlanSimulatorData(): Promise<GetPlanSimulatorDataOutput> {
  const planSimulatorService = container.resolve(PlanSimulatorService);
  return await planSimulatorService.getData();
}

