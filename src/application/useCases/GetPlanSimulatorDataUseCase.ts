import { inject, injectable } from "tsyringe";
import { INortusRepository } from "@/src/application/repositories.interface/INortusRepository";
import { PlanSimulatorDataResponse } from "@/src/domain/responses/planSimulator";
import {
  PlanSimulatorData,
  PlanType,
} from "@/src/domain/entities/planSimulator";

export interface GetPlanSimulatorDataOutput {
  data: PlanSimulatorData;
}

@injectable()
export class GetPlanSimulatorDataUseCase {
  constructor(
    @inject(INortusRepository)
    private readonly nortusRepository: INortusRepository
  ) {}

  async execute(): Promise<GetPlanSimulatorDataOutput> {
    const response = await this.nortusRepository.getPlanSimulatorData();
    return this._mapToDomain(response);
  }

  _mapToDomain(
    response: PlanSimulatorDataResponse
  ): GetPlanSimulatorDataOutput {
    return {
      data: {
        includedBenefits: response.includedBenefits,
        plans: response.plansIndicators.map((indicator) => ({
          id: this._derivePlanIdFromName(indicator.name),
          name: indicator.name,
          basePrice: indicator.value,
          baseConversionRate: indicator.conversion,
          baseRoi: indicator.roi,
          recommended: this._isPlanRecommended(indicator.name),
        })),
      },
    };
  }

  private _derivePlanIdFromName(name: string): PlanType {
    const normalizedName = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    if (normalizedName.includes("basico") || normalizedName.includes("basic")) {
      return "basic";
    }
    if (
      normalizedName.includes("intermediario") ||
      normalizedName.includes("intermediate")
    ) {
      return "intermediate";
    }
    if (normalizedName.includes("premium")) {
      return "premium";
    }

    return "basic";
  }

  private _isPlanRecommended(name: string): boolean {
    const normalizedName = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    return normalizedName.includes("premium");
  }
}
