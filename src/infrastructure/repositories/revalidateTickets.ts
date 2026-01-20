"use server";

import { revalidateTag } from "next/cache";
import { TICKETS_CACHE_TAG } from "./HttpNortusRepository";

export async function revalidateTicketsCache(): Promise<void> {
  revalidateTag(TICKETS_CACHE_TAG, "max");
}

