import React from "react";

export type ModalIconType = "success" | "warning" | "error" | "info" | "question";

export interface ModalButton {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  disabled?: boolean;
}

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  icon?: ModalIconType;
  customIcon?: React.ReactNode;
  title: string;
  subtitle?: string;
  buttons?: ModalButton[];
  closeOnBackdrop?: boolean;
  children?: React.ReactNode;
}
