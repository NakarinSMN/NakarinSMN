import React from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { ToastContainerProps } from "./types";

const POSITION_CLASS: Record<string, string> = {
  "top-right": "top-4 right-4 items-end",
  "top-left": "top-4 left-4 items-start",
  "bottom-right": "bottom-4 right-4 items-end",
  "bottom-left": "bottom-4 left-4 items-start",
  "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
};

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onClose,
  position = "top-right",
}) => {
  if (typeof window === "undefined") return null;

  return createPortal(
    <div
      className={`fixed z-[9999] flex flex-col gap-2 ${POSITION_CLASS[position]}`}
      aria-live="polite"
      aria-atomic="false"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={onClose} />
      ))}
    </div>,
    document.body
  );
};
