'use client';

import Image from "next/image";
import Select from "@/app/(authenticated)/ticket-management/_components/Select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SearchIcon from "@/assets/icons/search.svg";
import { useDebouncedCallback } from "use-debounce";
import { mockStatusOptions, mockPriorityOptions, mockAssigneeOptions } from "../_utils/mock";

export default function Filters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const defaultQuery = searchParams.get("query")?.toString() || "";
  const defaultStatus = searchParams.get("status")?.toString() || "";
  const defaultPriority = searchParams.get("priority")?.toString() || "";
  const defaultAssignee = searchParams.get("assignee")?.toString() || "";

  const handleSearch = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);

    if (query) params.set("query", query);
    else params.delete("query");

    params.delete("page");
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleFilter = (status?: string, priority?: string, assignee?: string) => {
    const params = new URLSearchParams(searchParams);

    if (status) params.set("status", status);
    else params.delete("status");

    if (priority) params.set("priority", priority);
    else params.delete("priority");

    if (assignee) params.set("assignee", assignee);
    else params.delete("assignee");

    params.delete("page");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <Image src={SearchIcon} alt="Search" width={14} height={14} />
            </div>
            <input
              type="text"
              placeholder="Buscar por ID, cliente ou assunto..."
              className="w-full rounded-full bg-background px-4 pl-10 py-2 text-sm text-label placeholder:text-label focus:outline-none focus:border-primary"
              defaultValue={defaultQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
        <Select
          name="status"
          defaultValue={defaultStatus}
          options={mockStatusOptions}
          onChange={(e) => handleFilter(e.target.value, defaultPriority, defaultAssignee)}
        />
        <Select
          name="priority"
          defaultValue={defaultPriority}
          options={mockPriorityOptions}
          onChange={(e) => handleFilter(defaultStatus, e.target.value, defaultAssignee)}
        />
        <Select
          name="assignee"
          defaultValue={defaultAssignee}
          options={mockAssigneeOptions}
          onChange={(e) => handleFilter(defaultStatus, defaultPriority, e.target.value)}
        />
      </div>
    </>
    );
}
