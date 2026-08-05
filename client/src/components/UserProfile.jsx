import React from 'react';
import { User, Mail, ShieldCheck, Heart, Lock, PhoneCall, Key } from 'lucide-react';

export default function UserProfile({ user, token }) {
  return (
    <div className="max-w-3xl mx-auto w-full space-y-8 pb-12">
      {/* Top Profile Banner */}
      <div className="premium-card p-8 rounded-3xl flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-extrabold text-3xl flex items-center justify-center shadow-lg shadow-emerald-500/25 shrink-0">
          {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </div>
        <div className="text-center sm:text-left space-y-1.5">
          <h2 className="text-2xl font-extrabold text-teal-950">{user?.name || 'Care Account'}</h2>
          <p className="text-xs font-semibold text-teal-700">{user?.email || 'user@example.com'}</p>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-900 bg-emerald-100/80 border border-emerald-300 px-3 py-1 rounded-full mt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Encrypted & Private Account
          </span>
        </div>
      </div>

      {/* Wellness Preferences Card */}
      <div className="premium-card p-8 rounded-3xl space-y-6">
        <h3 className="text-base font-extrabold text-teal-950 border-b border-teal-50 pb-4 flex items-center gap-2.5">
          <Heart className="w-5 h-5 text-emerald-600" />
          Care Profile & Security Details
        </h3>

        <div className="space-y-4 text-xs font-semibold">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-teal-50/50 border border-teal-100">
            <span className="text-teal-700 flex items-center gap-2"><Key className="w-4 h-4 text-emerald-600" /> Member ID</span>
            <span className="font-mono font-extrabold text-teal-950">{user?.id || '108'}</span>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-teal-50/50 border border-teal-100">
            <span className="text-teal-700 flex items-center gap-2"><User className="w-4 h-4 text-emerald-600" /> Full Name</span>
            <span className="font-extrabold text-teal-950">{user?.name || 'Demo User'}</span>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-teal-50/50 border border-teal-100">
            <span className="text-teal-700 flex items-center gap-2"><Mail className="w-4 h-4 text-emerald-600" /> Email Address</span>
            <span className="font-mono text-teal-950">{user?.email || 'user@example.com'}</span>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-teal-50/50 border border-teal-100">
            <span className="text-teal-700 flex items-center gap-2"><Heart className="w-4 h-4 text-emerald-600" /> Preferred Therapy Mode</span>
            <span className="font-extrabold text-emerald-900 bg-emerald-100/80 px-3 py-1 rounded-xl border border-emerald-300">
              Video & Chat
            </span>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-teal-50/50 border border-teal-100">
            <span className="text-teal-700 flex items-center gap-2"><Lock className="w-4 h-4 text-emerald-600" /> Privacy Protection</span>
            <span className="font-bold text-teal-950 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Active End-to-End Encryption
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
