"use server";

import { revalidateTag } from "next/cache";
import { container } from "@/di/container";
import {
  TICKETS_CACHE_TAG,
  HttpNortusRepository,
} from "../repositories/HttpNortusRepository";

export async function revalidateTicketsCache({
  eagerly = false,
}: {
  eagerly: boolean;
}): Promise<void> {
  revalidateTag(TICKETS_CACHE_TAG, "max");

  if (eagerly) {
    const repository = container.resolve(HttpNortusRepository);
    await repository.getAllTickets();
  }
}
