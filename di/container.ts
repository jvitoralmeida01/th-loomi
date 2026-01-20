import "reflect-metadata";
import { container } from "tsyringe";
import { HttpNortusRepository } from "@/src/infrastructure/repositories/HttpNortusRepository";
import {
  INortusRepository,
} from "@/src/application/repositories.interface/INortusRepository";
import { GetAllTicketsUseCase } from "@/src/application/useCases/GetAllTicketsUseCase";
import { GetTicketByIdUseCase } from "@/src/application/useCases/GetTicketByIdUseCase";
import { UpdateTicketUseCase } from "@/src/application/useCases/UpdateTicketUseCase";
import { TicketManagementService } from "@/src/application/services/TicketManagementService";

// Register repository implementations
container.register<INortusRepository>(
  INortusRepository,
  { useClass: HttpNortusRepository }
);

// Register use cases
container.register(GetAllTicketsUseCase, { useClass: GetAllTicketsUseCase });
container.register(GetTicketByIdUseCase, { useClass: GetTicketByIdUseCase });
container.register(UpdateTicketUseCase, { useClass: UpdateTicketUseCase });

// Register services
container.register(TicketManagementService, { useClass: TicketManagementService });

export { container };

