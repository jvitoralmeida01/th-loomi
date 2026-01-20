"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { toast, Toaster } from "sonner";
import { useEffect, useRef } from "react";
import CloseIcon from "@/assets/icons/close.svg";
import ErrorIcon from "@/assets/icons/toast_error.svg";
import SuccessIcon from "@/assets/icons/toast_success.svg";
import Image from "next/image";

function ToastContent({ title, subtitle, isSuccess, onClose }: { title: string; subtitle: string; isSuccess: boolean; onClose: () => void }) {
  return (
    <div className={`text-white px-4 py-3 rounded-lg shadow min-w-[200px] ${isSuccess ? "bg-primary" : "bg-priority-high"}`}>
      <div className="flex items-start justify-between gap-4">
        {isSuccess && <Image src={SuccessIcon} alt="Success Icon" className="w-4 h-4" />}
        {!isSuccess && <Image src={ErrorIcon} alt="Error Icon" className="w-4 h-4" />}

        <div className="flex flex-col gap-2 text-xs">
          <span className="whitespace-pre-line font-work-sans font-bold">{title}</span>
          <span className="whitespace-pre-line font-work-sans font-normal">{subtitle}</span>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-white/10 transition-colors"
          aria-label="Fechar"
        >
          <Image src={CloseIcon} alt="Close Icon" className="w-2 h-2" />
        </button>
      </div>
    </div>
  );
}

export default function EditTicketFeedback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const editTicketFeedback = searchParams.get("editTicketFeedback");
  const shownRef = useRef<string | null>(null);

  useEffect(() => {
    if (!editTicketFeedback) {
      shownRef.current = null;
      return;
    }

    if (shownRef.current === editTicketFeedback) return;

    shownRef.current = editTicketFeedback;

    if (editTicketFeedback === "success") {
      const toastId = toast.custom((_) => (
        <ToastContent
          title="Ticket atualizado com sucesso!"
          subtitle="O ticket foi atualizado e as alterações já estão visíveis."
          isSuccess
          onClose={() => toast.dismiss(toastId)}
        />
      ), { duration: 2000 });
    } else if (editTicketFeedback === "error") {
      const toastId = toast.custom((_) => (
        <ToastContent
          title="Erro ao atualizar ticket"
          subtitle="Ocorreu um erro ao atualizar o ticket. Por favor, tente novamente."
          isSuccess={false}
          onClose={() => toast.dismiss(toastId)}
        />
      ), { duration: 2000 });
    }

    // Clear the query parameter from the URL
    const params = new URLSearchParams(searchParams.toString());
    params.delete("editTicketFeedback");
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(newUrl);
  }, [editTicketFeedback, searchParams, router, pathname]);

  return null;
}

