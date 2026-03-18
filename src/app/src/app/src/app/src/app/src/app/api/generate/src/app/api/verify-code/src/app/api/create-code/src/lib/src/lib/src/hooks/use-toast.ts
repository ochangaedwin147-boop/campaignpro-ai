"use client";

import * as React from "react";

type ToastVariant = "default" | "destructive";

interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
}

interface ToastOptions {
  title?: string;
  description?: string;
  variant?: ToastVariant;
}

let toastCount = 0;
const listeners: Array<(toasts: Toast[]) => void> = [];
let toasts: Toast[] = [];

function emitChange() {
  listeners.forEach((listener) => listener([...toasts]));
}

export function toast(options: ToastOptions) {
  const id = `toast-${++toastCount}`;
  const newToast: Toast = {
    id,
    ...options,
  };
  
  toasts = [...toasts, newToast];
  emitChange();
  
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    emitChange();
  }, 5000);
  
  return {
    id,
    dismiss: () => {
      toasts = toasts.filter((t) => t.id !== id);
      emitChange();
    },
  };
}

export function useToast() {
  const [state, setState] = React.useState<Toast[]>(toasts);
  
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);
  
  return {
    toasts: state,
    toast,
    dismiss: (id: string) => {
      toasts = toasts.filter((t) => t.id !== id);
      emitChange();
    },
  };
}
