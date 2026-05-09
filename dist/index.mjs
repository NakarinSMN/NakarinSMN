import { useState, useRef, useEffect, useCallback } from 'react';
import { BsX, BsPlus, BsInfoCircleFill, BsExclamationCircleFill, BsExclamationTriangleFill, BsCheckCircleFill, BsQuestionCircleFill } from 'react-icons/bs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { createPortal } from 'react-dom';

// src/components/Toast/Toast.tsx
var CONFIG = {
  success: {
    icon: /* @__PURE__ */ jsx(BsCheckCircleFill, { className: "text-white text-lg" }),
    iconBg: "bg-green-500",
    bar: "bg-green-500"
  },
  warning: {
    icon: /* @__PURE__ */ jsx(BsExclamationTriangleFill, { className: "text-white text-lg" }),
    iconBg: "bg-amber-400",
    bar: "bg-amber-400"
  },
  error: {
    icon: /* @__PURE__ */ jsx(BsExclamationCircleFill, { className: "text-white text-lg" }),
    iconBg: "bg-red-500",
    bar: "bg-red-500"
  },
  info: {
    icon: /* @__PURE__ */ jsx(BsInfoCircleFill, { className: "text-white text-lg" }),
    iconBg: "bg-blue-500",
    bar: "bg-blue-500"
  }
};
var LABEL = {
  success: "\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08",
  warning: "\u0E04\u0E33\u0E40\u0E15\u0E37\u0E2D\u0E19",
  error: "\u0E40\u0E01\u0E34\u0E14\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14",
  info: "\u0E41\u0E08\u0E49\u0E07\u0E40\u0E15\u0E37\u0E2D\u0E19"
};
var Toast = ({
  id,
  type,
  title,
  message,
  duration = 3e3,
  onClose
}) => {
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(100);
  const startTime = useRef(Date.now());
  const rafRef = useRef(null);
  const handleClose = () => {
    setExiting(true);
    setTimeout(() => onClose(id), 300);
  };
  useEffect(() => {
    const tick = () => {
      const elapsed = Date.now() - startTime.current;
      const remaining = Math.max(0, 100 - elapsed / duration * 100);
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
  const seconds = Math.ceil(progress / 100 * (duration / 1e3));
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: [
        "relative flex items-center gap-3 bg-white rounded-xl shadow-lg px-4 py-3 w-72 overflow-hidden",
        "transition-all duration-300",
        exiting ? "animate-slide-out-right opacity-0" : "animate-slide-in-right"
      ].join(" "),
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `absolute bottom-0 left-0 h-1 ${bar} transition-all duration-100`,
            style: { width: `${progress}%` }
          }
        ),
        /* @__PURE__ */ jsx("div", { className: `flex-shrink-0 w-9 h-9 rounded-full ${iconBg} flex items-center justify-center`, children: icon }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-400 font-medium", children: [
              seconds,
              "s"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-sm text-gray-800 truncate", children: title || LABEL[type] })
          ] }),
          message && /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-0.5 truncate", children: message })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleClose,
            className: "flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition-colors",
            "aria-label": "\u0E1B\u0E34\u0E14",
            children: /* @__PURE__ */ jsx(BsX, { className: "text-white text-base" })
          }
        )
      ]
    }
  );
};
var POSITION_CLASS = {
  "top-right": "top-4 right-4 items-end",
  "top-left": "top-4 left-4 items-start",
  "bottom-right": "bottom-4 right-4 items-end",
  "bottom-left": "bottom-4 left-4 items-start",
  "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center"
};
var ToastContainer = ({
  toasts,
  onClose,
  position = "top-right"
}) => {
  if (typeof window === "undefined") return null;
  return createPortal(
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `fixed z-[9999] flex flex-col gap-2 ${POSITION_CLASS[position]}`,
        "aria-live": "polite",
        "aria-atomic": "false",
        children: toasts.map((toast) => /* @__PURE__ */ jsx(Toast, { ...toast, onClose }, toast.id))
      }
    ),
    document.body
  );
};
var ICON_CONFIG = {
  success: {
    icon: /* @__PURE__ */ jsx(BsCheckCircleFill, { className: "text-white text-4xl" }),
    bg: "bg-green-500",
    ring: "ring-green-100"
  },
  warning: {
    icon: /* @__PURE__ */ jsx(BsExclamationTriangleFill, { className: "text-white text-4xl" }),
    bg: "bg-amber-400",
    ring: "ring-amber-100"
  },
  error: {
    icon: /* @__PURE__ */ jsx(BsExclamationCircleFill, { className: "text-white text-4xl" }),
    bg: "bg-red-500",
    ring: "ring-red-100"
  },
  info: {
    icon: /* @__PURE__ */ jsx(BsInfoCircleFill, { className: "text-white text-4xl" }),
    bg: "bg-blue-500",
    ring: "ring-blue-100"
  },
  question: {
    icon: /* @__PURE__ */ jsx(BsQuestionCircleFill, { className: "text-white text-4xl" }),
    bg: "bg-purple-500",
    ring: "ring-purple-100"
  }
};
var BUTTON_CLASSES = {
  primary: "bg-gray-900 text-white hover:bg-gray-700 active:scale-95",
  secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 active:scale-95",
  danger: "bg-red-500 text-white hover:bg-red-600 active:scale-95",
  ghost: "bg-transparent text-gray-600 hover:bg-gray-100 active:scale-95"
};
var Modal = ({
  open,
  onClose,
  icon,
  customIcon,
  title,
  subtitle,
  buttons,
  closeOnBackdrop = true,
  children
}) => {
  const panelRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);
  if (typeof window === "undefined") return null;
  const iconCfg = icon ? ICON_CONFIG[icon] : null;
  return createPortal(
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: [
          "fixed inset-0 z-[9998] flex items-center justify-center p-4",
          "transition-all duration-200",
          open ? "visible" : "invisible pointer-events-none"
        ].join(" "),
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: [
                "absolute inset-0 bg-black transition-opacity duration-200",
                open ? "opacity-40" : "opacity-0"
              ].join(" "),
              onClick: closeOnBackdrop ? onClose : void 0
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              ref: panelRef,
              role: "dialog",
              "aria-modal": "true",
              "aria-labelledby": "smn-modal-title",
              className: [
                "relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 flex flex-col items-center gap-4",
                "transition-all duration-200",
                open ? "animate-scale-in" : "animate-scale-out opacity-0"
              ].join(" "),
              children: [
                customIcon ? /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: customIcon }) : iconCfg ? /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: [
                      "w-20 h-20 rounded-full flex items-center justify-center ring-8",
                      iconCfg.bg,
                      iconCfg.ring
                    ].join(" "),
                    children: iconCfg.icon
                  }
                ) : null,
                /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsx("h2", { id: "smn-modal-title", className: "text-lg font-bold text-gray-800", children: title }),
                  subtitle && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-1", children: subtitle })
                ] }),
                children && /* @__PURE__ */ jsx("div", { className: "w-full", children }),
                buttons && buttons.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex gap-3 w-full mt-2", children: buttons.map((btn, i) => /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: btn.onClick,
                    disabled: btn.disabled,
                    className: [
                      "flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-150",
                      BUTTON_CLASSES[btn.variant ?? "primary"],
                      btn.disabled ? "opacity-50 cursor-not-allowed" : ""
                    ].join(" "),
                    children: btn.label
                  },
                  i
                )) })
              ]
            }
          )
        ]
      }
    ),
    document.body
  );
};
var SIZE = {
  sm: { main: "w-10 h-10 text-xl", action: "w-9 h-9 text-base", gap: "gap-2" },
  md: { main: "w-14 h-14 text-2xl", action: "w-11 h-11 text-lg", gap: "gap-3" },
  lg: { main: "w-16 h-16 text-3xl", action: "w-12 h-12 text-xl", gap: "gap-3" }
};
var getTranslate = (dir, index, step) => {
  const offset = (index + 1) * step;
  const map = {
    up: `translateY(-${offset}px)`,
    down: `translateY(${offset}px)`,
    left: `translateX(-${offset}px)`,
    right: `translateX(${offset}px)`
  };
  return map[dir];
};
var SpeedDial = ({
  actions,
  direction = "up",
  mainIcon,
  mainColor = "bg-gray-700",
  tooltip = true,
  size = "md"
}) => {
  const [open, setOpen] = useState(false);
  const sz = SIZE[size];
  const step = size === "sm" ? 48 : size === "lg" ? 60 : 54;
  const isVertical = direction === "up" || direction === "down";
  return /* @__PURE__ */ jsxs("div", { className: `relative flex ${isVertical ? "flex-col" : "flex-row"} items-center ${sz.gap}`, children: [
    actions.map((action, i) => {
      const actualIndex = direction === "up" || direction === "left" ? actions.length - 1 - i : i;
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: "absolute flex items-center gap-2",
          style: {
            transform: open ? getTranslate(direction, i, step) : "translate(0,0)",
            opacity: open ? 1 : 0,
            pointerEvents: open ? "auto" : "none",
            transition: `transform 0.25s cubic-bezier(0.4,0,0.2,1) ${actualIndex * 40}ms, opacity 0.2s ease ${actualIndex * 40}ms`,
            zIndex: 10 - i
          },
          children: [
            tooltip && action.label && (direction === "up" || direction === "down") && /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold bg-gray-800 text-white rounded-md px-2 py-1 whitespace-nowrap shadow", children: action.label }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => {
                  action.onClick();
                  setOpen(false);
                },
                disabled: action.disabled,
                title: action.label,
                "aria-label": action.label,
                className: [
                  `${sz.action} rounded-full flex items-center justify-center shadow-lg`,
                  "transition-transform duration-150 active:scale-90",
                  action.color ?? "bg-white border border-gray-200 text-gray-700",
                  action.disabled ? "opacity-50 cursor-not-allowed" : "hover:brightness-90"
                ].join(" "),
                children: action.icon
              }
            ),
            tooltip && action.label && (direction === "left" || direction === "right") && /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold bg-gray-800 text-white rounded-md px-2 py-1 whitespace-nowrap shadow", children: action.label })
          ]
        },
        i
      );
    }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setOpen((v) => !v),
        "aria-expanded": open,
        "aria-label": open ? "\u0E1B\u0E34\u0E14\u0E40\u0E21\u0E19\u0E39" : "\u0E40\u0E1B\u0E34\u0E14\u0E40\u0E21\u0E19\u0E39",
        className: [
          `${sz.main} rounded-full flex items-center justify-center shadow-xl`,
          "transition-all duration-200 active:scale-90 hover:brightness-90 z-20",
          mainColor,
          "text-white"
        ].join(" "),
        children: /* @__PURE__ */ jsx(
          "span",
          {
            className: "transition-transform duration-300",
            style: { transform: open ? "rotate(45deg)" : "rotate(0deg)" },
            children: mainIcon ?? /* @__PURE__ */ jsx(BsPlus, {})
          }
        )
      }
    )
  ] });
};
var generateId = () => Math.random().toString(36).slice(2, 9);
var useToast = () => {
  const [toasts, setToasts] = useState([]);
  const add = useCallback(
    (type, title, message, duration = 3e3) => {
      const id = generateId();
      setToasts((prev) => [...prev, { id, type, title, message, duration }]);
    },
    []
  );
  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);
  const clear = useCallback(() => setToasts([]), []);
  return {
    toasts,
    toast: {
      success: (title, message, duration) => add("success", title, message, duration),
      warning: (title, message, duration) => add("warning", title, message, duration),
      error: (title, message, duration) => add("error", title, message, duration),
      info: (title, message, duration) => add("info", title, message, duration)
    },
    remove,
    clear
  };
};

export { Modal, SpeedDial, Toast, ToastContainer, useToast };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map