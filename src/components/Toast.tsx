import { useEffect } from 'react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

export interface ToastData {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ToastProps {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function Toast({ toast, onDismiss }: { toast: ToastData; onDismiss: (id: string) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const icons = {
    success: CheckCircle2,
    error: XCircle,
    info: Info,
  };
  const colors = {
    success: 'border-success-500 bg-success-50 text-success-600',
    error: 'border-error-500 bg-error-50 text-error-600',
    info: 'border-primary-500 bg-primary-50 text-primary-600',
  };

  const Icon = icons[toast.type];

  return (
    <div
      className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 shadow-lg animate-slide-in-right min-w-[280px] max-w-md ${colors[toast.type]}`}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className="flex-1 text-sm font-medium text-dark-800">{toast.message}</span>
      <button onClick={() => onDismiss(toast.id)} className="shrink-0 text-dark-400 hover:text-dark-600">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
