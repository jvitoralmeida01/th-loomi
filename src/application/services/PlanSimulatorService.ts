import { inject, injectable } from "tsyringe";
import {
  GetPlanSimulatorDataOutput,
  GetPlanSimulatorDataUseCase,
} from "@/src/application/useCases/GetPlanSimulatorDataUseCase";

@injectable()
export class PlanSimulatorService {
  constructor(
    @inject(GetPlanSimulatorDataUseCase)
    private readonly getPlanSimulatorDataUseCase: GetPlanSimulatorDataUseCase
  ) {}

  async getData(): Promise<GetPlanSimulatorDataOutput> {
    return await this.getPlanSimulatorDataUseCase.execute();
  }
}
