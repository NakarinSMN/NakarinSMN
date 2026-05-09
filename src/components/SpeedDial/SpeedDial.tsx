import React, { useState } from "react";
import { BsPlus } from "react-icons/bs";
import { SpeedDialDirection, SpeedDialProps } from "./types";

const SIZE = {
  sm: { main: "w-10 h-10 text-xl", action: "w-9 h-9 text-base", gap: "gap-2" },
  md: { main: "w-14 h-14 text-2xl", action: "w-11 h-11 text-lg", gap: "gap-3" },
  lg: { main: "w-16 h-16 text-3xl", action: "w-12 h-12 text-xl", gap: "gap-3" },
};

const getTranslate = (dir: SpeedDialDirection, index: number, step: number): string => {
  const offset = (index + 1) * step;
  const map: Record<SpeedDialDirection, string> = {
    up: `translateY(-${offset}px)`,
    down: `translateY(${offset}px)`,
    left: `translateX(-${offset}px)`,
    right: `translateX(${offset}px)`,
  };
  return map[dir];
};

export const SpeedDial: React.FC<SpeedDialProps> = ({
  actions,
  direction = "up",
  mainIcon,
  mainColor = "bg-gray-700",
  tooltip = true,
  size = "md",
}) => {
  const [open, setOpen] = useState(false);
  const sz = SIZE[size];
  const step = size === "sm" ? 48 : size === "lg" ? 60 : 54;

  const isVertical = direction === "up" || direction === "down";

  return (
    <div className={`relative flex ${isVertical ? "flex-col" : "flex-row"} items-center ${sz.gap}`}>
      {/* action buttons */}
      {actions.map((action, i) => {
        const actualIndex = direction === "up" || direction === "left"
          ? actions.length - 1 - i
          : i;

        return (
          <div
            key={i}
            className="absolute flex items-center gap-2"
            style={{
              transform: open ? getTranslate(direction, i, step) : "translate(0,0)",
              opacity: open ? 1 : 0,
              pointerEvents: open ? "auto" : "none",
              transition: `transform 0.25s cubic-bezier(0.4,0,0.2,1) ${actualIndex * 40}ms, opacity 0.2s ease ${actualIndex * 40}ms`,
              zIndex: 10 - i,
            }}
          >
            {/* tooltip left of button when direction=up */}
            {tooltip && action.label && (direction === "up" || direction === "down") && (
              <span className="text-xs font-semibold bg-gray-800 text-white rounded-md px-2 py-1 whitespace-nowrap shadow">
                {action.label}
              </span>
            )}

            <button
              onClick={() => { action.onClick(); setOpen(false); }}
              disabled={action.disabled}
              title={action.label}
              aria-label={action.label}
              className={[
                `${sz.action} rounded-full flex items-center justify-center shadow-lg`,
                "transition-transform duration-150 active:scale-90",
                action.color ?? "bg-white border border-gray-200 text-gray-700",
                action.disabled ? "opacity-50 cursor-not-allowed" : "hover:brightness-90",
              ].join(" ")}
            >
              {action.icon}
            </button>

            {/* tooltip right of button when direction=left/right */}
            {tooltip && action.label && (direction === "left" || direction === "right") && (
              <span className="text-xs font-semibold bg-gray-800 text-white rounded-md px-2 py-1 whitespace-nowrap shadow">
                {action.label}
              </span>
            )}
          </div>
        );
      })}

      {/* main FAB button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "ปิดเมนู" : "เปิดเมนู"}
        className={[
          `${sz.main} rounded-full flex items-center justify-center shadow-xl`,
          "transition-all duration-200 active:scale-90 hover:brightness-90 z-20",
          mainColor,
          "text-white",
        ].join(" ")}
      >
        <span
          className="transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          {mainIcon ?? <BsPlus />}
        </span>
      </button>
    </div>
  );
};
