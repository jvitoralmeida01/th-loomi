"use server";

import { mockClients } from "./_utils/mock";

export type Client = (typeof mockClients)[0];

export interface GetClientsParams {
  query?: string;
  status?: string;
  type?: string;
  region?: string;
}

export interface GetClientsResult {
  clients: Client[];
  total: number;
}

/**
 * Server action to fetch clients with filtering
 *
 * TODO: Replace this mock implementation with actual API call
 * Example:
 *   const response = await fetch(`${API_URL}/clients?query=${query}&status=${status}`);
 *   return await response.json();
 */
export async function getClients({
  query = "",
  status,
  type,
  region,
}: Readonly<GetClientsParams>): Promise<GetClientsResult> {
  const normalizedQuery = query.trim().toLowerCase();
  const hasFilters = status || type || region;

  const filteredClients = mockClients.filter((client) => {
    if (!normalizedQuery && !hasFilters) return true;

    const isQueryMatch =
      normalizedQuery &&
      (client.name.toLowerCase().includes(normalizedQuery) ||
        client.email.toLowerCase().includes(normalizedQuery));

    if (normalizedQuery && !hasFilters) return isQueryMatch;

    const isStatusMatch = status ? client.status === status : true;
    const isTypeMatch = type ? client.insuranceType === type : true;
    const isRegionMatch = region ? client.region === region : true;

    const filtersMatch = isStatusMatch && isTypeMatch && isRegionMatch;

    if (!normalizedQuery && hasFilters) return filtersMatch;

    return isQueryMatch && filtersMatch;
  });

  const sortedClients = filteredClients.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return {
    clients: sortedClients,
    total: sortedClients.length,
  };
}

