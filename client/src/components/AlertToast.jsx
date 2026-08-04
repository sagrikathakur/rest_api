import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export default function AlertToast({ alert, onClose }) {
  if (!alert || !alert.message) return null;

  const getAlertStyle = () => {
    switch (alert.type) {
      case 'success':
        return {
          bg: 'bg-emerald-950/80 border-emerald-500/40 text-emerald-200',
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
        };
      case 'error':
        return {
          bg: 'bg-rose-950/80 border-rose-500/40 text-rose-200',
          icon: <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />,
        };
      case 'info':
      default:
        return {
          bg: 'bg-cyan-950/80 border-cyan-500/40 text-cyan-200',
          icon: <Info className="w-5 h-5 text-cyan-400 shrink-0" />,
        };
    }
  };

  const style = getAlertStyle();

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-md transition-all duration-300 transform translate-y-0 animate-bounce-short ${style.bg}`}>
      {style.icon}
      <span className="text-sm font-medium pr-2">{alert.message}</span>
      <button
        onClick={onClose}
        className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-slate-200 transition-colors"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
