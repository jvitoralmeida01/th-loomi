"use client";

import { useFormStatus } from "react-dom";
import Button from "@/app/_components/Button";

export default function EditTicketSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <div className="flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-neutral-100 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        "Salvar"
      )}
    </Button>
  );
}

