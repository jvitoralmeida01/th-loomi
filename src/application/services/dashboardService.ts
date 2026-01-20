import { injectable, inject } from "tsyringe";
import { GetDashboardInput, GetDashboardOutput, GetDashboardUseCase } from "../useCases/GetDashboardDataUseCase";

@injectable()
export class DashboardService {
  constructor(
    @inject(GetDashboardUseCase)
    private readonly getDashboardUseCase: GetDashboardUseCase,
  ) {}

  async getData(input: GetDashboardInput): Promise<GetDashboardOutput> {
    return await this.getDashboardUseCase.execute(input);
  }
}

