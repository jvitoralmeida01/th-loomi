"use client";

import { usePathname } from "next/navigation";
import { routeTitles } from "@/app/_utils/routes";

export default function NavbarTitle() {
  const pathname = usePathname();

  return (
    <h2 className="font-montserrat font-semibold text-lg">
      {routeTitles[pathname as keyof typeof routeTitles]}
    </h2>
  )
}
