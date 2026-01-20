"use server";

import { container } from "@/di/container";
import { DashboardService } from "@/src/application/services/dashboardService";
import { GetDashboardInput, GetDashboardOutput } from "@/src/application/useCases/GetDashboardDataUseCase";

export async function getDashboardData(input: Readonly<GetDashboardInput>): Promise<GetDashboardOutput> {
  const dashboardService = container.resolve(DashboardService);
  return await dashboardService.getData(input);
}
