import { injectable, inject } from "tsyringe";
import { INortusRepository } from "@/src/application/repositories.interface/INortusRepository";
import { GetDashboardResponse } from "@/src/domain/responses/dashboard";
import {
  Client,
  ConversionRateData,
  KpiEvolutionData,
} from "@/src/domain/entities/dashboard";

export interface GetDashboardInput {
  query?: string;
  status?: string;
  type?: string;
  region?: string;
  sort?: string;
}

export interface GetDashboardOutput {
  charts: {
    kpiEvolution: {
      labels: string[];
      arpu: KpiEvolutionData;
      conversionRate: KpiEvolutionData;
      churn: KpiEvolutionData;
      retention: KpiEvolutionData;
    };
    conversionRate: {
      arpu: ConversionRateData;
      conversionRate: ConversionRateData;
      churn: ConversionRateData;
      retention: ConversionRateData;
    };
  };
  clients: {
    data: Client[];
    filters: {
      statusValues: string[];
      typeValues: string[];
      regionValues: string[];
    };
  };
}

@injectable()
export class GetDashboardUseCase {
  constructor(
    @inject(INortusRepository)
    private readonly nortusRepository: INortusRepository
  ) {}

  async execute(input: GetDashboardInput): Promise<GetDashboardOutput> {
    const dashboardDataResponse =
      await this.nortusRepository.getDashboardData();
    const data: GetDashboardOutput = this._mapToDomain(dashboardDataResponse);
    const filteredClients = this._filterClients(data.clients.data, input);
    const sortedClients = this._sortClients(filteredClients, input.sort);

    return {
      ...data,
      clients: {
        filters: data.clients.filters,
        data: sortedClients,
      },
    } as GetDashboardOutput;
  }

  _mapToDomain(response: GetDashboardResponse): GetDashboardOutput {
    return {
      charts: {
        kpiEvolution: {
          labels: response.kpisTrend.labels,
          arpu: response.kpisTrend.arpuTrend,
          conversionRate: response.kpisTrend.conversionTrend,
          churn: response.kpisTrend.churnTrend,
          retention: response.kpisTrend.retentionTrend,
        },
        conversionRate: {
          arpu: response.kpisResume.arpu,
          conversionRate: response.kpisResume.conversion,
          churn: response.kpisResume.churn,
          retention: response.kpisResume.retention,
        },
      },
      map: {},
      clients: {
        data: response.activeClients.data,
        filters: {
          statusValues: response.activeClients.filters.status,
          typeValues: response.activeClients.filters.secureType,
          regionValues: response.activeClients.filters.locations,
        },
      },
    } as GetDashboardOutput;
  }

  _filterClients(clients: Client[], input: GetDashboardInput): Client[] {
    const { query = "", status, type, region, sort } = input;

    const normalizedQuery = query.trim();
    const hasFilters = Boolean(status || type || region);

    const filteredClients = clients.filter((client) => {
      if (!normalizedQuery && !hasFilters) return true;

      const isQueryMatch =
        normalizedQuery &&
        (client.id.toLowerCase().includes(normalizedQuery.toLowerCase()) ||
          client.name.toLowerCase().includes(normalizedQuery.toLowerCase()) ||
          client.email.toLowerCase().includes(normalizedQuery.toLowerCase()));

      if (normalizedQuery && !hasFilters) return isQueryMatch;

      const isStatusMatch = status ? client?.status === status : true;
      const isTypeMatch = type ? client?.secureType === type : true;
      const isRegionMatch = region ? client?.location === region : true;

      const filtersMatch = isStatusMatch && isTypeMatch && isRegionMatch;

      if (!normalizedQuery && hasFilters) return filtersMatch;

      return isQueryMatch && filtersMatch;
    });

    return filteredClients;
  }

  _sortClients(clients: Client[], sort?: string): Client[] {
    if (!sort) return clients;

    if (sort === "asc") {
      return clients.sort((a, b) => a.name.localeCompare(b.name));
    }

    return clients.sort((a, b) => b.name.localeCompare(a.name));
  }
}
