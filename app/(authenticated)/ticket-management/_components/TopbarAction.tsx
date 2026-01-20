"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import routes from "@/app/_utils/routes";
import Image from "next/image";
import addIcon from "@/assets/icons/add.svg";
import clearParams from "../../../_utils/clearNewTicketParams";

export default function TopbarAction() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  if (pathname !== routes.ticketManagement) return null;

  function handleNewTicketClick() {
    const params = clearParams(new URLSearchParams(searchParams));
    params.set("newTicket", "true");
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <button
      type="button"
      onClick={handleNewTicketClick}
      className="flex flex-row items-center rounded-full bg-primary px-4 py-2 text-foreground text-xs cursor-pointer gap-2 font-montserrat font-semibold glow-primary hover:shadow-none transition-all duration-300"
    >
      <Image src={addIcon} alt="Add Ticket Icon" className="h-3 w-3" />
      Novo Ticket
    </button>
  );
}
