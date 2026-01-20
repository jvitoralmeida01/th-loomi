export type ClientStatus = "Ativo" | "Pendente";

export interface Client {
  id: string;
  name: string;
  email: string;
  secureType: string;
  monthValue: number;
  status: ClientStatus;
  renewalDate: string;
  location: string;
}

export interface KpiEvolutionData {
  name: string;
  data: number[];
}

export interface ConversionRateData {
  valor: number;
  variacao: number;
}
