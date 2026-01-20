"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import sortArrowIcon from "@/assets/icons/sort_arrow.svg";
import sortLetttersIcon from "@/assets/icons/sort_letters.svg";

interface SortableTableHeaderProps {
  label: string;
  width?: string;
}

export default function SortableTableHeader({ label, width = "w-[18%]" }: SortableTableHeaderProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentSort = searchParams.get("sort");
  const isDesc = currentSort === "desc";

  const handleClick = () => {
    const params = new URLSearchParams(searchParams);

    if (isDesc) {
      params.set("sort", "asc");
    } else {
      params.set("sort", "desc");
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <th
      className={`${width} py-1 text-xs font-montserrat font-normal text-neutral-100/70 cursor-pointer transition-colors`}
      onClick={handleClick}
    >
      <div className="flex items-center gap-1">
        <span className="select-none hover:bg-neutral-100/10 px-2 py-1 flex items-center rounded-md hover:text-neutral-100">
          {label}
          <div className="flex flex-row select-none">
            <Image
              src={sortArrowIcon}
              alt="Sort Arrow Icon"
              className={`w-3 h-3 transition-transform duration-200 ${isDesc ? "scale-y-[-1]" : ""}`}
            />
            <Image
              src={sortLetttersIcon}
              alt="Sort Letters Icon"
              className="w-3 h-3 -ml-1"
            />
          </div>
        </span>
      </div>
    </th>
  );
}

