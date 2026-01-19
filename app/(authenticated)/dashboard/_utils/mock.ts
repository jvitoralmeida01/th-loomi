// KPI Evolution Chart Data
export const kpiEvolutionData = {
  retention: {
    name: "Retenção",
    data: [65, 72, 78, 85, 82, 88, 90, 86, 92, 89, 94, 91],
  },
  conversion: {
    name: "Conversão",
    data: [45, 52, 48, 55, 62, 58, 65, 70, 68, 75, 72, 78],
  },
  churn: {
    name: "Churn",
    data: [12, 10, 8, 9, 7, 8, 6, 7, 5, 6, 4, 5],
  },
  arpu: {
    name: "ARPU",
    data: [120, 145, 160, 190, 210, 190, 220, 250, 230, 260, 280, 310],
    prefix: "R$",
    suffix: "k",
    multiplier: 1000,
  },
};

export const kpiCategories = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

// Conversion Rate Chart Data
export const conversionRateData = {
  name: "Novos clientes",
  data: [85, 110, 95, 75, 55, 42],
};

export const conversionRateCategories = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];

// Customer Map Data - Austin, Texas area
export type CustomerType = "residential" | "commercial" | "industrial";
export type CustomerStatus = "active" | "inactive" | "pending";

export interface CustomerLocation {
  id: string;
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
  type: CustomerType;
  status: CustomerStatus;
  address: string;
}

export const customerLocations: CustomerLocation[] = [
  {
    id: "1",
    name: "Tech Solutions LLC",
    coordinates: [-97.7431, 30.2672],
    type: "commercial",
    status: "active",
    address: "100 Congress Ave, Austin, TX",
  },
  {
    id: "2",
    name: "Austin Country Club",
    coordinates: [-97.7894, 30.3456],
    type: "commercial",
    status: "active",
    address: "4408 Long Champ Dr, Austin, TX",
  },
  {
    id: "3",
    name: "Emma Long Metro Park",
    coordinates: [-97.8512, 30.3234],
    type: "residential",
    status: "pending",
    address: "1600 City Park Rd, Austin, TX",
  },
  {
    id: "4",
    name: "Austin 360 Bridge",
    coordinates: [-97.7989, 30.3567],
    type: "residential",
    status: "active",
    address: "360 Bridge, Austin, TX",
  },
  {
    id: "5",
    name: "Bright Leaf Preserve",
    coordinates: [-97.7345, 30.3298],
    type: "residential",
    status: "active",
    address: "5501 Bright Leaf, Austin, TX",
  },
  {
    id: "6",
    name: "Mayfield Park",
    coordinates: [-97.7712, 30.3123],
    type: "residential",
    status: "inactive",
    address: "3505 W 35th St, Austin, TX",
  },
  {
    id: "7",
    name: "West Lake Hills",
    coordinates: [-97.8123, 30.2856],
    type: "residential",
    status: "inactive",
    address: "West Lake Hills, TX",
  },
  {
    id: "8",
    name: "Tarrytown Industrial",
    coordinates: [-97.7678, 30.2934],
    type: "industrial",
    status: "active",
    address: "Tarrytown, Austin, TX",
  },
  {
    id: "9",
    name: "Hyde Park Residence",
    coordinates: [-97.7234, 30.3034],
    type: "residential",
    status: "active",
    address: "Hyde Park, Austin, TX",
  },
  {
    id: "10",
    name: "Mueller Development",
    coordinates: [-97.7056, 30.2989],
    type: "commercial",
    status: "active",
    address: "Mueller, Austin, TX",
  },
  {
    id: "11",
    name: "North Loop Business",
    coordinates: [-97.7312, 30.3178],
    type: "commercial",
    status: "active",
    address: "North Loop, Austin, TX",
  },
  {
    id: "12",
    name: "Rosedale Center",
    coordinates: [-97.7456, 30.3089],
    type: "commercial",
    status: "pending",
    address: "Rosedale, Austin, TX",
  },
  {
    id: "13",
    name: "Windsor Park Factory",
    coordinates: [-97.6923, 30.3123],
    type: "industrial",
    status: "active",
    address: "Windsor Park, Austin, TX",
  },
  {
    id: "14",
    name: "Allandale Warehouse",
    coordinates: [-97.7389, 30.3356],
    type: "industrial",
    status: "pending",
    address: "Allandale, Austin, TX",
  },
  {
    id: "15",
    name: "Crestview Industrial",
    coordinates: [-97.7234, 30.3445],
    type: "industrial",
    status: "active",
    address: "Crestview, Austin, TX",
  },
  {
    id: "16",
    name: "Allied Waste Services",
    coordinates: [-97.6734, 30.3234],
    type: "industrial",
    status: "active",
    address: "Daffan, Austin, TX",
  },
  {
    id: "17",
    name: "Little Walnut Creek",
    coordinates: [-97.6845, 30.2878],
    type: "residential",
    status: "active",
    address: "Little Walnut Creek, Austin, TX",
  },
];

export const locationFilterOptions = [
  { value: "", label: "Todos os locais" },
  { value: "austin-north", label: "Austin Norte" },
  { value: "austin-south", label: "Austin Sul" },
  { value: "austin-east", label: "Austin Leste" },
  { value: "austin-west", label: "Austin Oeste" },
];

export const typeFilterOptions = [
  { value: "", label: "Todos os tipos" },
  { value: "residential", label: "Residencial" },
  { value: "commercial", label: "Comercial" },
  { value: "industrial", label: "Industrial" },
];

// Active Clients Table Data
export type ClientStatus = "active" | "pending";
export type InsuranceType =
  | "auto"
  | "residential"
  | "travel"
  | "combo-auto-residential";

export interface Client {
  id: string;
  name: string;
  email: string;
  insuranceType: InsuranceType;
  monthlyValue: number;
  status: ClientStatus;
  renewalDate: string;
  region: string;
}

export const insuranceTypeLabels: Record<InsuranceType, string> = {
  auto: "Seguro automóvel",
  residential: "Seguro residencial",
  travel: "Seguro viagem",
  "combo-auto-residential": "Combo automóvel e residencial",
};

export const clientStatusLabels: Record<ClientStatus, string> = {
  active: "Ativo",
  pending: "Pendente",
};

export const mockClients: Client[] = [
  {
    id: "1",
    name: "Ricardo Leite",
    email: "ricardo@email.com",
    insuranceType: "auto",
    monthlyValue: 185.9,
    status: "active",
    renewalDate: "14/12/2024",
    region: "São Paulo",
  },
  {
    id: "2",
    name: "Maria Silva",
    email: "mariasilva@email.com",
    insuranceType: "residential",
    monthlyValue: 89.9,
    status: "active",
    renewalDate: "14/12/2024",
    region: "Rio de Janeiro",
  },
  {
    id: "3",
    name: "João Costa",
    email: "costajoao@email.com",
    insuranceType: "travel",
    monthlyValue: 230.0,
    status: "pending",
    renewalDate: "14/12/2024",
    region: "Brasília",
  },
  {
    id: "4",
    name: "Residencial Premium",
    email: "rpremium@email.com",
    insuranceType: "residential",
    monthlyValue: 89.9,
    status: "active",
    renewalDate: "14/12/2024",
    region: "Pernambuco",
  },
  {
    id: "5",
    name: "Vida Empresarial",
    email: "vidaempresarial@email.com",
    insuranceType: "travel",
    monthlyValue: 230.0,
    status: "active",
    renewalDate: "14/12/2024",
    region: "Mato Grosso",
  },
  {
    id: "6",
    name: "Família Total",
    email: "familiatotal@email.com",
    insuranceType: "combo-auto-residential",
    monthlyValue: 260.0,
    status: "active",
    renewalDate: "14/12/2024",
    region: "Paraíba",
  },
];

export const clientStatusFilterOptions = [
  { value: "", label: "Todos os status" },
  { value: "active", label: "Ativo" },
  { value: "pending", label: "Pendente" },
];

export const clientTypeFilterOptions = [
  { value: "", label: "Todos os tipos" },
  { value: "auto", label: "Seguro automóvel" },
  { value: "residential", label: "Seguro residencial" },
  { value: "travel", label: "Seguro viagem" },
  { value: "combo-auto-residential", label: "Combo automóvel e residencial" },
];

export const clientRegionFilterOptions = [
  { value: "", label: "Todos os locais" },
  { value: "São Paulo", label: "São Paulo" },
  { value: "Rio de Janeiro", label: "Rio de Janeiro" },
  { value: "Brasília", label: "Brasília" },
  { value: "Pernambuco", label: "Pernambuco" },
  { value: "Mato Grosso", label: "Mato Grosso" },
  { value: "Paraíba", label: "Paraíba" },
];

