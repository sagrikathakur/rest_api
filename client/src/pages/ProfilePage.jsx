import React from 'react';
import { User, Mail, ShieldCheck, Heart, Lock, Key } from 'lucide-react';

export default function ProfilePage({ user }) {
  return (
    <div className="max-w-2xl mx-auto w-full space-y-6 py-8 px-4 sm:px-8">

      {/* Top Profile Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-black text-2xl flex items-center justify-center shadow-md shadow-emerald-500/20 shrink-0">
          {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </div>
        <div className="text-center sm:text-left space-y-1">
          <h2 className="text-xl font-extrabold text-slate-900">{user?.name || 'Care Account'}</h2>
          <p className="text-xs text-slate-500 font-semibold">{user?.email || 'user@example.com'}</p>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full mt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Encrypted HIPAA-Compliant Account
          </span>
        </div>
      </div>

      {/* Wellness Preferences Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <Heart className="w-4 h-4 text-emerald-600" />
          Care Profile & Security Preferences
        </h3>

        <div className="space-y-3 text-xs font-semibold">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 flex items-center gap-2"><Key className="w-4 h-4 text-emerald-600" /> Member ID</span>
            <span className="font-mono font-bold text-slate-900">{user?.id || '108'}</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 flex items-center gap-2"><User className="w-4 h-4 text-emerald-600" /> Full Name</span>
            <span className="font-bold text-slate-900">{user?.name || 'Demo User'}</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 flex items-center gap-2"><Mail className="w-4 h-4 text-emerald-600" /> Email Address</span>
            <span className="font-mono text-slate-900">{user?.email || 'user@example.com'}</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 flex items-center gap-2"><Heart className="w-4 h-4 text-emerald-600" /> Preferred Therapy Mode</span>
            <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
              Video & Chat
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 flex items-center gap-2"><Lock className="w-4 h-4 text-emerald-600" /> Data Privacy</span>
            <span className="font-bold text-slate-900 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Active HIPAA Protection
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
