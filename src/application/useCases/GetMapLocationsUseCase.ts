import { inject, injectable } from "tsyringe";
import { INortusRepository } from "@/src/application/repositories.interface/INortusRepository";
import { GetMapLocationsResponse } from "@/src/domain/responses/GetMapLocationsResponse";
import { MapLocations } from "@/src/domain/entities/mapLocations";

export interface GetMapLocationsOutput {
  locations: MapLocations;
}

@injectable()
export class GetMapLocationsUseCase {
  constructor(
    @inject(INortusRepository)
    private readonly nortusRepository: INortusRepository
  ) {}

  async execute(): Promise<GetMapLocationsOutput> {
    const response = await this.nortusRepository.getMapLocations();
    return this._mapToDomain(response);
  }

  _mapToDomain(response: GetMapLocationsResponse): GetMapLocationsOutput {
    return {
      locations: response.data.locations.map((location) => ({
        id: location.id,
        name: location.name,
        description: location.description,
        coordinates: location.coordinates,
        category: location.category,
        address: location.address,
        icon: location.icon,
        color: location.color,
      })),
    };
  }
}
