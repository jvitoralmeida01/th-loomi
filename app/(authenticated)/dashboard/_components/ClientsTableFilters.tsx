"use client";

import Image from "next/image";
import Select from "./Select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SearchIcon from "@/assets/icons/search.svg";
import { useDebouncedCallback } from "use-debounce";

interface ClientsTableFiltersProps {
  statusValues: string[];
  typeValues: string[];
  regionValues: string[];
}

export default function ClientsTableFilters(props: ClientsTableFiltersProps) {
  const { statusValues, typeValues, regionValues } = props;

  const statusOptions = statusValues.map((status) => ({
    label: status,
    value: status === "Todos" ? "" : status,
  }));

  const typeOptions = typeValues.map((type) => ({
    label: type,
    value: type === "Todos" ? "" : type,
  }));

  const regionOptions = regionValues.map((region) => ({
    label: region,
    value: region === "Todos" ? "" : region,
  }));

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const defaultQuery = searchParams.get("query")?.toString() || "";
  const defaultStatus = searchParams.get("status")?.toString() || "";
  const defaultType = searchParams.get("type")?.toString() || "";
  const defaultRegion = searchParams.get("region")?.toString() || "";

  const handleSearch = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);

    if (query) params.set("query", query);
    else params.delete("query");

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, 300);

  const handleFilter = (status?: string, type?: string, region?: string) => {
    const params = new URLSearchParams(searchParams);

    if (status) params.set("status", status);
    else params.delete("status");

    if (type) params.set("type", type);
    else params.delete("type");

    if (region) params.set("region", region);
    else params.delete("region");

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 overflow-x-auto">
      <div className="flex-1">
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Image src={SearchIcon} alt="Search" className="w-3 h-3" />
          </div>
          <input
            type="text"
            placeholder="Buscar por nome ou email..."
            className="w-full rounded-full bg-background px-4 pl-10 py-2 text-xs text-label placeholder:text-label focus:outline-none focus:border-primary"
            defaultValue={defaultQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <Select
        name="status"
        defaultValue={defaultStatus}
        options={statusOptions}
        onChange={(e) =>
          handleFilter(e.target.value, defaultType, defaultRegion)
        }
      />
      <Select
        name="type"
        defaultValue={defaultType}
        options={typeOptions}
        onChange={(e) =>
          handleFilter(defaultStatus, e.target.value, defaultRegion)
        }
      />
      <Select
        name="region"
        defaultValue={defaultRegion}
        options={regionOptions}
        onChange={(e) =>
          handleFilter(defaultStatus, defaultType, e.target.value)
        }
      />
    </div>
  );
}
