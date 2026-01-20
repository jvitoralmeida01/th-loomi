import "reflect-metadata";
import { container } from "tsyringe";
import { HttpNortusRepository } from "@/src/infrastructure/repositories/HttpNortusRepository";
import { INortusRepository } from "@/src/application/repositories.interface/INortusRepository";
import { GetAllTicketsUseCase } from "@/src/application/useCases/GetAllTicketsUseCase";
import { GetTicketByIdUseCase } from "@/src/application/useCases/GetTicketByIdUseCase";
import { UpdateTicketUseCase } from "@/src/application/useCases/UpdateTicketUseCase";
import { LoginUseCase } from "@/src/application/useCases/LoginUseCase";
import { GetUserInfoUseCase } from "@/src/application/useCases/GetUserInfoUseCase";
import { GetDashboardUseCase } from "@/src/application/useCases/GetDashboardDataUseCase";
import { GetMapLocationsUseCase } from "@/src/application/useCases/GetMapLocationsUseCase";
import { GetPlanSimulatorDataUseCase } from "@/src/application/useCases/GetPlanSimulatorDataUseCase";
import { TicketManagementService } from "@/src/application/services/TicketManagementService";
import { AuthService } from "@/src/application/services/AuthService";
import { DashboardService } from "@/src/application/services/dashboardService";
import { MapLocationsService } from "@/src/application/services/MapLocationsService";
import { PlanSimulatorService } from "@/src/application/services/PlanSimulatorService";

// Register repository implementations
container.register<INortusRepository>(INortusRepository, {
  useClass: HttpNortusRepository,
});

// Register use cases
container.register(GetAllTicketsUseCase, { useClass: GetAllTicketsUseCase });
container.register(GetTicketByIdUseCase, { useClass: GetTicketByIdUseCase });
container.register(UpdateTicketUseCase, { useClass: UpdateTicketUseCase });
container.register(LoginUseCase, { useClass: LoginUseCase });
container.register(GetUserInfoUseCase, { useClass: GetUserInfoUseCase });
container.register(GetDashboardUseCase, { useClass: GetDashboardUseCase });
container.register(GetMapLocationsUseCase, { useClass: GetMapLocationsUseCase });
container.register(GetPlanSimulatorDataUseCase, {
  useClass: GetPlanSimulatorDataUseCase,
});

// Register services
container.register(TicketManagementService, {
  useClass: TicketManagementService,
});
container.register(AuthService, { useClass: AuthService });
container.register(DashboardService, { useClass: DashboardService });
container.register(MapLocationsService, { useClass: MapLocationsService });
container.register(PlanSimulatorService, { useClass: PlanSimulatorService });

export { container };
