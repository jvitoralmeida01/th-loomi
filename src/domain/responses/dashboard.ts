interface KpisTrendDataResponse {
  name: string;
  data: number[];
}

interface KpiResumeDataResponse {
  valor: number;
  variacao: number;
}

interface ActiveClientsTableDataItemResponse {
  id: string;
  name: string;
  email: string;
  secureType: string;
  monthValue: number;
  status: string;
  renewalDate: string;
  location: string;
}

export interface ActiveClientsTableDataResponse {
  filters: {
    status: string[];
    secureType: string[];
    locations: string[];
  };
  data: ActiveClientsTableDataItemResponse[];
}

export interface GetDashboardResponse {
  kpisTrend: {
    labels: string[];
    arpuTrend: KpisTrendDataResponse;
    conversionTrend: KpisTrendDataResponse;
    churnTrend: KpisTrendDataResponse;
    retentionTrend: KpisTrendDataResponse;
  };

  kpisResume: {
    arpu: KpiResumeDataResponse;
    conversion: KpiResumeDataResponse;
    retention: KpiResumeDataResponse;
    churn: KpiResumeDataResponse;
  };

  segments: {
    name: string;
    valor: number;
  }[];

  activeClients: ActiveClientsTableDataResponse;
}
