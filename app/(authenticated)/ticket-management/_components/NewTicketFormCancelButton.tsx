"use client";

import { cancelTicketCreation } from "../actions";

export default function NewTicketFormCancelButton() {

  return (
    <button type="button" className="rounded-xl border border-neutral-200 px-6 py-4 text-neutral-100 text-sm cursor-pointer" onClick={() => cancelTicketCreation()}>
      Cancelar
    </button>
  );
}
