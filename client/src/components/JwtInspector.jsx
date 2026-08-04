import React from 'react';
import { Binary, Code, Sparkles } from 'lucide-react';

export default function JwtInspector({ token }) {
  const parseJwt = (t) => {
    try {
      const base64Url = t.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  const parseJwtHeader = (t) => {
    try {
      const base64Url = t.split('.')[0];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch (e) {
      return null;
    }
  };

  if (!token) {
    return (
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 text-center space-y-3">
        <div className="flex justify-center">
          <div className="p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-500">
            <Binary className="w-6 h-6" />
          </div>
        </div>
        <h3 className="text-sm font-bold text-slate-300">Live JWT Inspector</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Sign in or register to view real-time JWT structure (Header, Payload, Signature) and decode claims instantly.
        </p>
      </div>
    );
  }

  const parts = token.split('.');
  const isValidFormat = parts.length === 3;
  const headerObj = isValidFormat ? parseJwtHeader(token) : null;
  const payloadObj = isValidFormat ? parseJwt(token) : null;

  return (
    <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-slate-200">Live JWT Inspector & Visualizer</h3>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 self-start sm:self-auto">
          Active JWT Token Stored
        </span>
      </div>

      {/* Raw Color-coded Token string */}
      <div className="space-y-2">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
          Raw Token Breakdown (Header . Payload . Signature)
        </span>
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs break-all leading-relaxed tracking-wider">
          {isValidFormat ? (
            <>
              <span className="text-rose-400 font-semibold" title="Header (Algorithm & Token Type)">
                {parts[0]}
              </span>
              <span className="text-slate-500 font-bold px-0.5">.</span>
              <span className="text-purple-400 font-semibold" title="Payload (User Claims & Expiry)">
                {parts[1]}
              </span>
              <span className="text-slate-500 font-bold px-0.5">.</span>
              <span className="text-cyan-400 font-semibold" title="Signature (Secret HMAC Verified)">
                {parts[2]}
              </span>
            </>
          ) : (
            <span className="text-rose-400">{token} (Invalid JWT format)</span>
          )}
        </div>
      </div>

      {/* Decoded JSON cards */}
      {isValidFormat && headerObj && payloadObj && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Header Card */}
          <div className="rounded-xl bg-slate-950/80 border border-rose-500/30 p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Code className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-xs font-bold text-rose-400">Header: Algorithm & Token Type</span>
            </div>
            <pre className="p-3 rounded-lg bg-slate-900 font-mono text-xs text-rose-300 border border-slate-800 overflow-x-auto">
              {JSON.stringify(headerObj, null, 2)}
            </pre>
          </div>

          {/* Payload Card */}
          <div className="rounded-xl bg-slate-950/80 border border-purple-500/30 p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Code className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-xs font-bold text-purple-400">Payload: Data Claims & Expiry</span>
            </div>
            <pre className="p-3 rounded-lg bg-slate-900 font-mono text-xs text-purple-300 border border-slate-800 overflow-x-auto">
              {JSON.stringify(payloadObj, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
