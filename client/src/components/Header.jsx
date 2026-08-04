import React from 'react';
import { ShieldCheck, RefreshCw, Cpu, Server, WifiOff } from 'lucide-react';

export default function Header({ backendStatus, isMockMode, onToggleMode, onRecheckHealth }) {
  const getStatusBadge = () => {
    if (isMockMode) {
      return {
        dotClass: 'bg-amber-400',
        text: 'Backend: Simulated (Offline)',
        badgeClass: 'bg-amber-950/60 border-amber-500/30 text-amber-300',
        btnText: 'Mode: Simulated',
        icon: <Cpu className="w-3.5 h-3.5 text-amber-400" />
      };
    }

    switch (backendStatus) {
      case 'online':
        return {
          dotClass: 'bg-emerald-400 animate-pulse-glow',
          text: 'Backend: Online (Port 3000)',
          badgeClass: 'bg-emerald-950/60 border-emerald-500/30 text-emerald-300',
          btnText: 'Mode: Real Server',
          icon: <Server className="w-3.5 h-3.5 text-emerald-400" />
        };
      case 'offline':
        return {
          dotClass: 'bg-rose-500',
          text: 'Backend: Offline (Port 3000)',
          badgeClass: 'bg-rose-950/60 border-rose-500/30 text-rose-300',
          btnText: 'Mode: Real Server',
          icon: <WifiOff className="w-3.5 h-3.5 text-rose-400" />
        };
      case 'checking':
      default:
        return {
          dotClass: 'bg-cyan-400 animate-ping',
          text: 'Checking Backend...',
          badgeClass: 'bg-cyan-950/60 border-cyan-500/30 text-cyan-300',
          btnText: 'Checking...',
          icon: <RefreshCw className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
        };
    }
  };

  const status = getStatusBadge();

  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 rounded-2xl border border-indigo-500/30 shadow-lg shadow-indigo-500/10">
          <ShieldCheck className="w-8 h-8 text-cyan-400" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-400 bg-clip-text text-transparent">
              AuthLab
            </h1>
            <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
              React + Tailwind v4
            </span>
          </div>
          <p className="text-sm text-slate-400">Interactive Authentication Learning & Client Portal</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border backdrop-blur-md text-xs font-medium ${status.badgeClass}`}>
          <span className={`w-2 h-2 rounded-full ${status.dotClass}`} />
          <span>{status.text}</span>
          {status.icon}
        </div>

        <button
          onClick={onToggleMode}
          className="px-3 py-1.5 text-xs font-semibold rounded-full border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white transition-all shadow-sm active:scale-95"
          title="Toggle between real server and simulated offline mode"
        >
          {status.btnText}
        </button>

        {!isMockMode && (
          <button
            onClick={onRecheckHealth}
            className="p-1.5 rounded-full border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-cyan-400 transition-colors"
            title="Recheck backend server status"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </header>
  );
}
