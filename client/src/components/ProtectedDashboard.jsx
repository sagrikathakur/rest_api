import React, { useState } from 'react';
import { User, LogOut, Send, AlertTriangle, ShieldCheck, Terminal } from 'lucide-react';

export default function ProtectedDashboard({
  currentUser,
  token,
  onTestApi,
  onCorruptToken,
  onLogout,
  apiResponse,
  isTestingApi
}) {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-indigo-950/40 border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-slate-950 font-bold text-xl shadow-lg shadow-emerald-500/20">
            {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : <User className="w-7 h-7" />}
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
              Protected Member Area
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
                Authenticated
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Welcome back, <span className="text-emerald-400 font-semibold">{currentUser?.name || 'User'}</span>! You are authorized with a active JWT token.
            </p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="px-4 py-2 text-xs font-semibold rounded-xl border border-rose-500/30 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 transition-colors flex items-center gap-1.5 shrink-0"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Main Grid: User Profile & API Tester */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* User Identity Profile Card */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <User className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-slate-200">User Identity Profile</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400">User ID</span>
              <span className="font-mono font-semibold text-emerald-400">{currentUser?.id || '1'}</span>
            </div>

            <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400">Full Name</span>
              <span className="font-medium text-slate-200">{currentUser?.name || 'Demo User'}</span>
            </div>

            <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400">Email Address</span>
              <span className="font-mono text-cyan-300">{currentUser?.email || 'demo@example.com'}</span>
            </div>

            <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400">Auth Status</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Token
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Endpoint Tester & Corruptor */}
        <div className="lg:col-span-2 p-6 rounded-2xl glass-panel border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-slate-200">Protected API Endpoint Console</h3>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                GET /api/me
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              Test sending an HTTP request with the <code className="text-cyan-300 font-mono">Authorization: Bearer &lt;token&gt;</code> header to verify server-side JWT authentication.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <button
                onClick={onTestApi}
                disabled={isTestingApi}
                className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Fetch GET /api/me</span>
              </button>

              <button
                onClick={onCorruptToken}
                className="px-4 py-2.5 rounded-xl bg-amber-950/60 hover:bg-amber-900/60 border border-amber-500/40 text-amber-300 font-semibold text-xs transition-all flex items-center gap-2 active:scale-95"
                title="Corrupt current token to test how server rejects invalid signature"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Simulate Corrupt Token</span>
              </button>
            </div>
          </div>

          {/* Response Inspector */}
          {apiResponse && (
            <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  HTTP Server Response
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-md text-xs font-mono font-bold ${
                    apiResponse.status && apiResponse.status.startsWith('2')
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}
                >
                  {apiResponse.status}
                </span>
              </div>
              <pre className="p-3 rounded-lg bg-slate-900 font-mono text-xs text-cyan-300 overflow-x-auto border border-slate-800 max-h-48">
                {apiResponse.json}
              </pre>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
