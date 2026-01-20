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

export default function NewTicketFeedback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const newTicketFeedback = searchParams.get("newTicketFeedback");
  const shownRef = useRef<string | null>(null);

  useEffect(() => {
    if (!newTicketFeedback) {
      shownRef.current = null;
      return;
    }

    if (shownRef.current === newTicketFeedback) return;

    shownRef.current = newTicketFeedback;

    if (newTicketFeedback === "success") {
      const toastId = toast.custom((_) => (
        <ToastContent
          title="Ticket criado com sucesso!"
          subtitle="O ticket foi criado e já está na sua lista."
          isSuccess
          onClose={() => toast.dismiss(toastId)}
        />
      ), { duration: 2000 });
    } else if (newTicketFeedback === "error") {
      const toastId = toast.custom((_) => (
        <ToastContent
          title="Erro ao criar ticket"
          subtitle="Ocorreu um erro ao criar o ticket. Por favor, tente novamente."
          isSuccess={false}
          onClose={() => toast.dismiss(toastId)}
        />
      ), { duration: 2000 });
    }

    // Clear the query parameter from the URL
    const params = new URLSearchParams(searchParams.toString());
    params.delete("newTicketFeedback");
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(newUrl);
  }, [newTicketFeedback, searchParams, router, pathname]);

  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        className: "shadow-lg [&>div]:rounded-lg",
      }}
    />
  );
}

