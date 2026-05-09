import React from "react";

export interface SpeedDialAction {
  icon: React.ReactNode;
  label?: string;
  onClick: () => void;
  disabled?: boolean;
  color?: string; // tailwind bg class e.g. "bg-blue-500"
}

export type SpeedDialDirection = "up" | "down" | "left" | "right";

export interface SpeedDialProps {
  actions: SpeedDialAction[];
  direction?: SpeedDialDirection;
  mainIcon?: React.ReactNode;
  mainColor?: string;
  tooltip?: boolean;
  size?: "sm" | "md" | "lg";
}
