import { useCallback, useState } from "react";
import { ToastItem, ToastType } from "../components/Toast/types";

const generateId = () => Math.random().toString(36).slice(2, 9);

export interface UseToastReturn {
  toasts: ToastItem[];
  toast: {
    success: (title: string, message?: string, duration?: number) => void;
    warning: (title: string, message?: string, duration?: number) => void;
    error: (title: string, message?: string, duration?: number) => void;
    info: (title: string, message?: string, duration?: number) => void;
  };
  remove: (id: string) => void;
  clear: () => void;
}

export const useToast = (): UseToastReturn => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const add = useCallback(
    (type: ToastType, title: string, message?: string, duration = 3000) => {
      const id = generateId();
      setToasts((prev) => [...prev, { id, type, title, message, duration }]);
    },
    []
  );

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clear = useCallback(() => setToasts([]), []);

  return {
    toasts,
    toast: {
      success: (title, message, duration) => add("success", title, message, duration),
      warning: (title, message, duration) => add("warning", title, message, duration),
      error: (title, message, duration) => add("error", title, message, duration),
      info: (title, message, duration) => add("info", title, message, duration),
    },
    remove,
    clear,
  };
};
