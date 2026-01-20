import "reflect-metadata";
import { container } from "tsyringe";
import { HttpNortusRepository } from "@/src/infrastructure/repositories/HttpNortusRepository";
import {
  INortusRepository,
} from "@/src/application/repositories.interface/INortusRepository";
import { GetAllTicketsUseCase } from "@/src/application/useCases/GetAllTicketsUseCase";
import { TicketManagementService } from "@/src/application/services/TicketManagementService";

// Register repository implementations
container.register<INortusRepository>(
  INortusRepository,
  { useClass: HttpNortusRepository }
);

// Register use cases
container.register(GetAllTicketsUseCase, { useClass: GetAllTicketsUseCase });

// Register services
container.register(TicketManagementService, { useClass: TicketManagementService });

export { container };

