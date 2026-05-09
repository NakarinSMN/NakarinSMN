import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  BsCheckCircleFill,
  BsExclamationTriangleFill,
  BsExclamationCircleFill,
  BsInfoCircleFill,
  BsQuestionCircleFill,
} from "react-icons/bs";
import { ModalButton, ModalIconType, ModalProps } from "./types";

const ICON_CONFIG: Record<
  ModalIconType,
  { icon: React.ReactNode; bg: string; ring: string }
> = {
  success: {
    icon: <BsCheckCircleFill className="text-white text-4xl" />,
    bg: "bg-green-500",
    ring: "ring-green-100",
  },
  warning: {
    icon: <BsExclamationTriangleFill className="text-white text-4xl" />,
    bg: "bg-amber-400",
    ring: "ring-amber-100",
  },
  error: {
    icon: <BsExclamationCircleFill className="text-white text-4xl" />,
    bg: "bg-red-500",
    ring: "ring-red-100",
  },
  info: {
    icon: <BsInfoCircleFill className="text-white text-4xl" />,
    bg: "bg-blue-500",
    ring: "ring-blue-100",
  },
  question: {
    icon: <BsQuestionCircleFill className="text-white text-4xl" />,
    bg: "bg-purple-500",
    ring: "ring-purple-100",
  },
};

const BUTTON_CLASSES: Record<NonNullable<ModalButton["variant"]>, string> = {
  primary: "bg-gray-900 text-white hover:bg-gray-700 active:scale-95",
  secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 active:scale-95",
  danger: "bg-red-500 text-white hover:bg-red-600 active:scale-95",
  ghost: "bg-transparent text-gray-600 hover:bg-gray-100 active:scale-95",
};

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  icon,
  customIcon,
  title,
  subtitle,
  buttons,
  closeOnBackdrop = true,
  children,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (typeof window === "undefined") return null;

  const iconCfg = icon ? ICON_CONFIG[icon] : null;

  return createPortal(
    <div
      className={[
        "fixed inset-0 z-[9998] flex items-center justify-center p-4",
        "transition-all duration-200",
        open ? "visible" : "invisible pointer-events-none",
      ].join(" ")}
    >
      {/* backdrop */}
      <div
        className={[
          "absolute inset-0 bg-black transition-opacity duration-200",
          open ? "opacity-40" : "opacity-0",
        ].join(" ")}
        onClick={closeOnBackdrop ? onClose : undefined}
      />

      {/* panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="smn-modal-title"
        className={[
          "relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 flex flex-col items-center gap-4",
          "transition-all duration-200",
          open ? "animate-scale-in" : "animate-scale-out opacity-0",
        ].join(" ")}
      >
        {/* icon */}
        {customIcon ? (
          <div className="flex items-center justify-center">{customIcon}</div>
        ) : iconCfg ? (
          <div
            className={[
              "w-20 h-20 rounded-full flex items-center justify-center ring-8",
              iconCfg.bg,
              iconCfg.ring,
            ].join(" ")}
          >
            {iconCfg.icon}
          </div>
        ) : null}

        {/* text */}
        <div className="text-center">
          <h2 id="smn-modal-title" className="text-lg font-bold text-gray-800">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>

        {/* custom content */}
        {children && <div className="w-full">{children}</div>}

        {/* buttons */}
        {buttons && buttons.length > 0 && (
          <div className="flex gap-3 w-full mt-2">
            {buttons.map((btn, i) => (
              <button
                key={i}
                onClick={btn.onClick}
                disabled={btn.disabled}
                className={[
                  "flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-150",
                  BUTTON_CLASSES[btn.variant ?? "primary"],
                  btn.disabled ? "opacity-50 cursor-not-allowed" : "",
                ].join(" ")}
              >
                {btn.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
