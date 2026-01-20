"use server";

import { container } from "@/di/container";
import { DashboardService } from "@/src/application/services/dashboardService";
import { MapLocationsService } from "@/src/application/services/MapLocationsService";
import {
  GetDashboardInput,
  GetDashboardOutput,
} from "@/src/application/useCases/GetDashboardDataUseCase";
import { GetMapLocationsOutput } from "@/src/application/useCases/GetMapLocationsUseCase";

export async function getDashboardData(
  input: Readonly<GetDashboardInput>
): Promise<GetDashboardOutput> {
  const dashboardService = container.resolve(DashboardService);
  return await dashboardService.getData(input);
}

export async function getMapLocations(): Promise<GetMapLocationsOutput> {
  const mapLocationsService = container.resolve(MapLocationsService);
  return await mapLocationsService.getLocations();
}
