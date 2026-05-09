import React from 'react';

type ToastType = "success" | "warning" | "error" | "info";
interface ToastItem {
    id: string;
    type: ToastType;
    title: string;
    message?: string;
    duration?: number;
}
interface ToastProps extends ToastItem {
    onClose: (id: string) => void;
}
interface ToastContainerProps {
    toasts: ToastItem[];
    onClose: (id: string) => void;
    position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
}

declare const Toast: React.FC<ToastProps>;

declare const ToastContainer: React.FC<ToastContainerProps>;

type ModalIconType = "success" | "warning" | "error" | "info" | "question";
interface ModalButton {
    label: string;
    onClick: () => void;
    variant?: "primary" | "secondary" | "danger" | "ghost";
    disabled?: boolean;
}
interface ModalProps {
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

declare const Modal: React.FC<ModalProps>;

interface SpeedDialAction {
    icon: React.ReactNode;
    label?: string;
    onClick: () => void;
    disabled?: boolean;
    color?: string;
}
type SpeedDialDirection = "up" | "down" | "left" | "right";
interface SpeedDialProps {
    actions: SpeedDialAction[];
    direction?: SpeedDialDirection;
    mainIcon?: React.ReactNode;
    mainColor?: string;
    tooltip?: boolean;
    size?: "sm" | "md" | "lg";
}

declare const SpeedDial: React.FC<SpeedDialProps>;

interface UseToastReturn {
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
declare const useToast: () => UseToastReturn;

export { Modal, type ModalButton, type ModalIconType, type ModalProps, SpeedDial, type SpeedDialAction, type SpeedDialDirection, type SpeedDialProps, Toast, ToastContainer, type ToastContainerProps, type ToastItem, type ToastProps, type ToastType, type UseToastReturn, useToast };
