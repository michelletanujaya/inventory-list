import React, { createContext, useContext, useState, ReactNode } from "react";
import Toast, { ToastProps } from "./Toast";

interface ToastData {
  id: string;
  message: string;
  variant: "success" | "error";
  duration?: number;
}

interface ToastContextType {
  showToast: (
    message: string,
    variant: "success" | "error",
    duration?: number
  ) => void;
  showSuccess: (message: string, duration?: number) => void;
  showError: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = (
    message: string,
    variant: "success" | "error",
    duration?: number
  ) => {
    const id = Date.now().toString();
    const newToast: ToastData = {
      id,
      message,
      variant,
      duration,
    };

    setToasts((prev) => [...prev, newToast]);
  };

  const showSuccess = (message: string, duration?: number) => {
    showToast(message, "success", duration);
  };

  const showError = (message: string, duration?: number) => {
    showToast(message, "error", duration);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast, showSuccess, showError }}>
      {children}
      <div>
        {toasts.map((toast, index) => (
          <div
            key={toast.id}
            style={{
              position: "fixed",
              top: 20 + index * 80,
              right: 20,
              zIndex: 1000,
            }}
          >
            <Toast
              message={toast.message}
              variant={toast.variant}
              duration={toast.duration}
              onClose={() => removeToast(toast.id)}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
