import React from 'react';
import OtpVerification from '../components/OtpVerification';

export default function OtpPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Page Title Header */}
      <div className="text-center space-y-2 max-w-lg mx-auto">
        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider">
          Authentication Demo
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Email OTP Verification Flow
        </h1>
        <p className="text-xs text-slate-600 font-medium">
          Test requesting 6-digit OTP codes (`POST /auth/send-otp`) and verifying stored SHA-256 OTP hashes (`POST /auth/verify-otp`).
        </p>
      </div>

      {/* OTP Component */}
      <OtpVerification />
    </div>
  );
}
