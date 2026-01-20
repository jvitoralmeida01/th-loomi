import { inject, injectable } from "tsyringe";
import {
  GetMapLocationsOutput,
  GetMapLocationsUseCase,
} from "@/src/application/useCases/GetMapLocationsUseCase";

@injectable()
export class MapLocationsService {
  constructor(
    @inject(GetMapLocationsUseCase)
    private readonly getMapLocationsUseCase: GetMapLocationsUseCase
  ) {}

  async getLocations(): Promise<GetMapLocationsOutput> {
    return await this.getMapLocationsUseCase.execute();
  }
}
