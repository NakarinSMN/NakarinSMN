import React, { useEffect, useRef, useState } from "react";
import {
  BsCheckCircleFill,
  BsExclamationTriangleFill,
  BsExclamationCircleFill,
  BsInfoCircleFill,
  BsX,
} from "react-icons/bs";
import { ToastProps, ToastType } from "./types";

const CONFIG: Record<
  ToastType,
  { icon: React.ReactNode; iconBg: string; bar: string }
> = {
  success: {
    icon: <BsCheckCircleFill className="text-white text-lg" />,
    iconBg: "bg-green-500",
    bar: "bg-green-500",
  },
  warning: {
    icon: <BsExclamationTriangleFill className="text-white text-lg" />,
    iconBg: "bg-amber-400",
    bar: "bg-amber-400",
  },
  error: {
    icon: <BsExclamationCircleFill className="text-white text-lg" />,
    iconBg: "bg-red-500",
    bar: "bg-red-500",
  },
  info: {
    icon: <BsInfoCircleFill className="text-white text-lg" />,
    iconBg: "bg-blue-500",
    bar: "bg-blue-500",
  },
};

const LABEL: Record<ToastType, string> = {
  success: "สำเร็จ",
  warning: "คำเตือน",
  error: "เกิดข้อผิดพลาด",
  info: "แจ้งเตือน",
};

export const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  duration = 3000,
  onClose,
}) => {
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(100);
  const startTime = useRef(Date.now());
  const rafRef = useRef<number | null>(null);

  const handleClose = () => {
    setExiting(true);
    setTimeout(() => onClose(id), 300);
  };

  useEffect(() => {
    const tick = () => {
      const elapsed = Date.now() - startTime.current;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining > 0) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        handleClose();
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [duration]);

  const { icon, iconBg, bar } = CONFIG[type];
  const seconds = Math.ceil((progress / 100) * (duration / 1000));

  return (
    <div
      className={[
        "relative flex items-center gap-3 bg-white rounded-xl shadow-lg px-4 py-3 w-72 overflow-hidden",
        "transition-all duration-300",
        exiting ? "animate-slide-out-right opacity-0" : "animate-slide-in-right",
      ].join(" ")}
    >
      {/* progress bar */}
      <div
        className={`absolute bottom-0 left-0 h-1 ${bar} transition-all duration-100`}
        style={{ width: `${progress}%` }}
      />

      {/* icon */}
      <div className={`flex-shrink-0 w-9 h-9 rounded-full ${iconBg} flex items-center justify-center`}>
        {icon}
      </div>

      {/* content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-400 font-medium">{seconds}s</span>
          <span className="font-semibold text-sm text-gray-800 truncate">{title || LABEL[type]}</span>
        </div>
        {message && (
          <p className="text-xs text-gray-500 mt-0.5 truncate">{message}</p>
        )}
      </div>

      {/* close */}
      <button
        onClick={handleClose}
        className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition-colors"
        aria-label="ปิด"
      >
        <BsX className="text-white text-base" />
      </button>
    </div>
  );
};
