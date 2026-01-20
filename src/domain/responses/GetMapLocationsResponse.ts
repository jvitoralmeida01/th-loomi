interface MapLocationResponse {
  id: string;
  name: string;
  description: string;
  coordinates: [number, number];
  category: string;
  address: string;
  icon: string;
  color: string;
}

export interface GetMapLocationsResponse {
  data: {
    locations: MapLocationResponse[];
  };
}
