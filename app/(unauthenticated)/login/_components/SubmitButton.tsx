"use client";

import { useFormStatus } from "react-dom";
import Button, { ButtonVariant } from "@/app/_components/Button";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="w-full mt-12"
      variant={ButtonVariant.PRIMARY}
      disabled={pending}
    >
      {pending ? "Entrando..." : "Entrar"}
    </Button>
  );
}
