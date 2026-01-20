import React from "react";

interface ModalProps {
  isOpen: boolean;
  children?: React.ReactNode;
}

export default function Modal({ isOpen, children }: Readonly<ModalProps>) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-background opacity-50"></div>

      <div className="relative z-10 max-h-[90vh] overflow-y-auto max-w-[90vw] overflow-x-auto">
        {children}
      </div>
    </div>
  );
}
