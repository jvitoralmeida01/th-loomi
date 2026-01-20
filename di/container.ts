import "reflect-metadata";
import { container } from "tsyringe";
import { HttpNortusRepository } from "@/src/infrastructure/repositories/HttpNortusRepository";
import { INortusRepository } from "@/src/application/repositories.interface/INortusRepository";
import { GetAllTicketsUseCase } from "@/src/application/useCases/GetAllTicketsUseCase";
import { GetTicketByIdUseCase } from "@/src/application/useCases/GetTicketByIdUseCase";
import { UpdateTicketUseCase } from "@/src/application/useCases/UpdateTicketUseCase";
import { LoginUseCase } from "@/src/application/useCases/LoginUseCase";
import { GetUserInfoUseCase } from "@/src/application/useCases/GetUserInfoUseCase";
import { TicketManagementService } from "@/src/application/services/TicketManagementService";
import { AuthService } from "@/src/application/services/AuthService";

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

// Register services
container.register(TicketManagementService, {
  useClass: TicketManagementService,
});
container.register(AuthService, { useClass: AuthService });

export { container };
